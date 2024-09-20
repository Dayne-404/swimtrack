import { Divider, Stack } from '@mui/material';
import FinderHeader from '../components/filter/FilterHeader';
import FinderCards from '../components/layout/FinderCards';
import { useContext, useEffect, useRef, useState } from 'react';
import { Worksheet } from '../config/worksheetType';
import { fetchWorksheets } from '../helper/worksheetFetch';
import FilterModal from '../components/filter/FilterModal';
import SortModal from '../components/filter/SortModal';
import { AlertContext } from '../App';
import Loading from '../components/layout/Loading';
import ViewHeader from '../components/layout/ViewHeader';

const DEFAULT_LIMIT = 9;

interface FiltersByType {
	[type: string]: (number | string)[];
}

interface FinderViewProps {
	defaultInstructorId: string;
}

const LibraryWorksheetSearch = ({ defaultInstructorId }: FinderViewProps) => {
	const formatSortOptions = (sortOptions: {
		[type: string]: number;
	}): string => {
		return Object.entries(sortOptions)
			.map(([key, value]) => {
				return value === 1 ? `&sort=-${key}` : `&sort=${key}`;
			})
			.join('');
	};

	const [selectedFilters, setSelectedFilters] = useState<FiltersByType>(
		defaultInstructorId ? { instructor: ['66e083d5e781e4ee0b2602e7'] } : {}
	);
	const [sortOptions, setSortOptions] = useState<{ [type: string]: number }>({
		createdAt: 1,
	});
	const [formattedFilters, setFormattedFilters] = useState<string>(
		defaultInstructorId ? '&instructor=66e083d5e781e4ee0b2602e7' : ''
	);
	const [formattedSort, setFormattedSort] = useState<string>(
		formatSortOptions(sortOptions)
	);

	const [moreWorksheets, setMoreWorksheets] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit] = useState<number>(DEFAULT_LIMIT);
	const [totalWorksheets, setTotalWorksheets] = useState<number>(0);
	const showAlert = useContext(AlertContext);
	const showAlertRef = useRef(showAlert);

	const handleSortSelect = (type: string, sort: number) => {
		setSortOptions((prevOptions) => {
			const updatedOptions = { ...prevOptions };

			if (sort === 0) {
				delete updatedOptions[type];
			} else {
				updatedOptions[type] = sort;
			}

			return updatedOptions;
		});
	};

	const handleFilterSelect = (type: string, filter: number | string) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[type]: [...(prevFilters[type] || []), filter],
		}));
	};

	const handleMultipleFilterSelect = (type: string, filter: string[]) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[type]: filter,
		}));

		console.log('Handle: ', selectedFilters);
	};

	const handleFilterRemove = (type: string, filter: number | string) => {
		setSelectedFilters((prevFilters) => {
			const updatedFilters =
				prevFilters[type]?.filter((f) => f !== filter) || [];

			const newFilters: FiltersByType = { ...prevFilters };

			if (updatedFilters.length > 0) {
				newFilters[type] = updatedFilters;
			} else {
				delete newFilters[type];
			}

			return newFilters;
		});
	};

	const clearFilters = () => setSelectedFilters({});

	const handleModalClose = () => {
		setIsModalOpen(false);
		console.log(selectedFilters);
	};

	const handleSortModalClose = () => {
		const sortString = formatSortOptions(sortOptions);

		if (sortString !== formattedSort) {
			setWorksheets([]);
			setSkip(0);
			setFormattedSort(sortString);
		}

		setIsSortModalOpen(false);
	};

	useEffect(() => {
		const loadWorksheets = async () => {
			setLoading(true);
			try {
				const data = await fetchWorksheets({
					limit,
					skip,

					filters: formattedFilters, //Change this move inside function?
					sorting: formattedSort, //Change this move inside function?
				});
				const totalCount = data.totalCount;
				setTotalWorksheets(totalCount);
				const newWorksheets = data.worksheets;

				if (newWorksheets.length > 0) {
					setWorksheets((prevWorksheets) => {
						const uniqueWorksheets = new Set(
							prevWorksheets.map((w) => w._id)
						);
						const filteredNewWorksheets = newWorksheets.filter(
							(w: Worksheet) => !uniqueWorksheets.has(w._id)
						);

						return [...prevWorksheets, ...filteredNewWorksheets];
					});
				}

				if (
					totalCount - (skip + DEFAULT_LIMIT) > 0 &&
					totalCount > limit
				) {
					setMoreWorksheets(true);
				} else {
					setMoreWorksheets(false);
				}
			} catch (error) {
				const errorMesage =
					error instanceof Error
						? error.message
						: 'An unkown error occurred';

				showAlertRef.current(errorMesage);
			} finally {
				setLoading(false);
			}
		};

		loadWorksheets();
	}, [limit, skip, formattedFilters, formattedSort]);

	useEffect(() => {
		const formatFilters = () => {
			const queryString = Object.keys(selectedFilters)
				.map((key) => {
					const values =
						selectedFilters[key as keyof typeof selectedFilters];

					return values
						.map(
							(value) =>
								`${encodeURIComponent(
									key
								)}=${encodeURIComponent(value)}`
						)
						.join('&');
				})
				.join('&');

			if (queryString || (!queryString && formattedFilters)) {
				setWorksheets([]);
				setSkip(0);

				if (!queryString && formattedFilters) {
					setFormattedFilters('');
				} else {
					setFormattedFilters(`&${queryString}`);
				}
			}
		};

		formatFilters();
	}, [selectedFilters, formattedFilters]);

	const handleViewMore = () => {
		setSkip((prevSkip) => prevSkip + limit);
	};

	const content = () => {
		return (
			<Stack spacing={1} width="100%">
				{!defaultInstructorId && <ViewHeader text='Finder' /> }
				<Divider />
				<FilterModal
					selectedFilters={selectedFilters}
					isModalOpen={isModalOpen}
					handleModalClose={handleModalClose}
					handleFilterSelect={handleFilterSelect}
					handleFilterRemove={handleFilterRemove}
					clearFilters={clearFilters}
				/>
				<SortModal
					sortOptions={sortOptions}
					handleChange={handleSortSelect}
					isModalOpen={isSortModalOpen}
					handleModalClose={handleSortModalClose}
				/>
				<FinderHeader
					includeSearch={defaultInstructorId === undefined}
					disabled={loading}
					setModalOpen={setIsModalOpen}
					setSortModalOpen={setIsSortModalOpen}
					handleMultipleInstructorSelect={handleMultipleFilterSelect}
				/>
				{loading && worksheets.length === 0 ? (
					<Loading />
				) : (
					<FinderCards
						totalWorksheets={totalWorksheets}
						currentWorksheets={worksheets.length}
						loading={loading}
						worksheets={worksheets}
						moreWorksheets={moreWorksheets}
						handleViewMore={handleViewMore}
					/>
				)}
			</Stack>
		);
	};

	return <>{content()}</>;
};

export default LibraryWorksheetSearch;
