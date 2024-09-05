import { Stack, CircularProgress } from '@mui/material';
import LibraryFilters from '../components/filter/Filter';
import FinderCards from '../components/layout/FinderCards';
import { useEffect, useState } from 'react';
import { Worksheet } from '../config/worksheetType';
import { fetchWorksheets } from '../helper/fetch';
import FilterModal from '../components/filter/FilterModal';
import View from '../components/layout/View';
import SnackbarAlert from '../components/layout/SnackbarAlert';
import SortModal from '../components/filter/SortModal';
interface SnackbarState {
	open: boolean;
	message: string;
	severity: 'success' | 'error';
}

interface SortOptions {
	level: 'recent' | 'oldest' | '';
	time: 'recent' | 'oldest' | '';
	day: 'recent' | 'oldest' | '';
	session: 'recent' | 'oldest' | '';
	createdAt: 'recent' | 'oldest';
}

interface FiltersByType {
	[type: string]: string[];
}

const DEFAULT_LIMIT = 9;

const LibraryWorksheetSearch = () => {
	const formatSortOptions = (sortOptions: SortOptions): string => {
		let sortString = '';

		Object.keys(sortOptions).forEach((key) => {
			const value = sortOptions[key as keyof typeof sortOptions];

			if (value === 'recent') {
				sortString += `&sort=${key}`;
			} else if (value === 'oldest') {
				sortString += `&sort=-${key}`;
			}
		});

		return sortString;
	};

	const [selectedFilters, setSelectedFilters] = useState<FiltersByType>({});
	const [formattedFilters, setFormattedFilters] = useState<string>('');
	const [moreWorksheets, setMoreWorksheets] = useState<boolean>(false);
	const [snackbarState, setSnackbarState] = useState<SnackbarState>({
		open: false,
		message: '',
		severity: 'error',
	});
	const [sortOptions, setSortOptions] = useState<SortOptions>({
		level: '',
		time: '',
		day: '',
		session: '',
		createdAt: 'recent',
	});
	const [formattedSort, setFormattedSort] = useState<string>(formatSortOptions(sortOptions) || '');
	const [loading, setLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit] = useState<number>(DEFAULT_LIMIT);
	const [totalWorksheets, setTotalWorksheets] = useState<number>(0);

	const handleSortChange =
		(key: keyof SortOptions) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSortOptions((prevOptions) => ({
				...prevOptions,
				[key]: event.target.value as SortOptions[keyof SortOptions],
			}));
		};

	const handleFilterSelect = (type: string, filter: string) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[type]: [...(prevFilters[type] || []), filter],
		}));
	};

	const handleFilterRemove = (type: string, filter: string) => {
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
		const queryString = Object.keys(selectedFilters)
			.map((key) => {
				let values =
					selectedFilters[key as keyof typeof selectedFilters];

				if (key === 'level') {
					values = values.map((value) =>
						value.toLowerCase().replace(/\s+/g, '')
					);
				}

				return values
					.map(
						(value) =>
							`${encodeURIComponent(key)}=${encodeURIComponent(
								value
							)}`
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
		setIsModalOpen(false);
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
					filters: formattedFilters,
					sorting: formattedSort,
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
				setSnackbarState({
					open: true,
					message: `${error}`,
					severity: 'error',
				});
			} finally {
				setLoading(false);
			}
		};

		loadWorksheets();
	}, [limit, skip, formattedFilters, formattedSort]);

	const handleViewMore = () => {
		setSkip((prevSkip) => prevSkip + limit);
	};

	const content = () => {
		return (
			<Stack spacing={1} width="100%">
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
					handleChange={handleSortChange}
					isModalOpen={isSortModalOpen}
					handleModalClose={handleSortModalClose}
				/>
				<LibraryFilters
					setModalOpen={setIsModalOpen}
					setSortModalOpen={setIsSortModalOpen}
				/>
				{loading && worksheets.length === 0 ? (
					<Stack width="100%" alignItems="center" pt={5}>
						<CircularProgress size={60} />
					</Stack>
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

	return (
		<View
			maxHeight={80}
			headerText="Worksheet Finder"
			flex={0}
			body={
				<>
					<SnackbarAlert
						snackbarState={snackbarState}
						setSnackbarState={setSnackbarState}
					/>{' '}
					{content()}
				</>
			}
		/>
	);
};

export default LibraryWorksheetSearch;
