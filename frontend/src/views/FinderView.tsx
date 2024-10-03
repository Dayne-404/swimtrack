import { Divider, Pagination, Stack } from '@mui/material';
import FinderHeader from '../components/layout/finder/FilterHeader';
import { useContext, useEffect, useRef, useState } from 'react';
import { Worksheet } from '../config/worksheetType';
import { fetchWorksheets } from '../helper/worksheetGetRequests';
import FilterModal from '../components/modals/FilterModal';
import SortModal from '../components/modals/SortModal';
import { AlertContext } from '../App';
import ViewHeader from '../components/layout/main/ViewHeader';
import WorksheetGrid from '../components/layout/grids/WorksheetGrid';

const DEFAULT_LIMIT = 12;

interface FiltersByType {
	[type: string]: (number | string)[];
}

const LibraryWorksheetSearch = ({
	specificToInstructor = false,
}: {
	specificToInstructor?: boolean;
}) => {
	const [filterOptions, setFilterOptions] = useState<FiltersByType>({});
	const [sortOptions, setSortOptions] = useState<{ [type: string]: number }>({
		createdAt: 1,
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [skip, setSkip] = useState<number>(0);
	const [limit] = useState<number>(DEFAULT_LIMIT);
	const [totalWorksheets, setTotalWorksheets] = useState<number>(0);
	const showAlert = useContext(AlertContext);
	const showAlertRef = useRef(showAlert);

	const [selectedFilters, setSelectedFilters] = useState<FiltersByType>(filterOptions);
	const [selectedSortOptions, setSelectedSortOptions] = useState<{
		[type: string]: number;
	}>(sortOptions);

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
		setFilterOptions((prevFilters) => ({
			...prevFilters,
			[type]: [...(prevFilters[type] || []), filter],
		}));
	};

	const handleMultipleFilterSelect = (type: string, filter: string[]) => {
		setWorksheets([]);
		setSkip(0);

		setFilterOptions((prevFilters) => ({
			...prevFilters,
			[type]: filter,
		}));

		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[type]: filter,
		}));
	};

	const handleFilterRemove = (type: string, filter: number | string) => {
		setFilterOptions((prevFilters) => {
			const updatedFilters = prevFilters[type]?.filter((f) => f !== filter) || [];

			const newFilters: FiltersByType = { ...prevFilters };

			if (updatedFilters.length > 0) {
				newFilters[type] = updatedFilters;
			} else {
				delete newFilters[type];
			}

			return newFilters;
		});
	};

	const handleModalClose = () => {
		if (selectedFilters !== filterOptions) {
			setSkip(0);
			setSelectedFilters(filterOptions);
		}

		setIsModalOpen(false);
	};

	const handleSortModalClose = () => {
		if (selectedSortOptions !== sortOptions) {
			setSkip(0);
			setSelectedSortOptions(sortOptions);
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
					filters: selectedFilters,
					sorting: selectedSortOptions,
					specific: specificToInstructor,
				});
				
				setTotalWorksheets(data.totalCount);
				setWorksheets(data.worksheets);
			} catch (error) {
				const errorMesage =
					error instanceof Error ? error.message : 'An unkown error occurred';

				showAlertRef.current(errorMesage);
			} finally {
				setLoading(false);
			}
		};

		loadWorksheets();
	}, [limit, skip, selectedFilters, selectedSortOptions, specificToInstructor]);

	return (
		<Stack spacing={1} width="100%">
			{!specificToInstructor && <ViewHeader text="Finder" />}
			<Divider />
			<FilterModal
				selectedFilters={filterOptions}
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				handleFilterSelect={handleFilterSelect}
				handleFilterRemove={handleFilterRemove}
				clearFilters={() => setFilterOptions({})}
			/>
			<SortModal
				sortOptions={sortOptions}
				handleChange={handleSortSelect}
				isModalOpen={isSortModalOpen}
				handleModalClose={handleSortModalClose}
			/>
			<FinderHeader
				includeSearch={!specificToInstructor}
				disabled={loading}
				setModalOpen={setIsModalOpen}
				setSortModalOpen={setIsSortModalOpen}
				handleMultipleInstructorSelect={handleMultipleFilterSelect}
			/>
			<Stack flexGrow={1}>
			<WorksheetGrid
				worksheets={worksheets}
				loading={loading}
			/>
			</Stack>
			{totalWorksheets > DEFAULT_LIMIT && (
				<Pagination
					count={Math.ceil(totalWorksheets / limit)}
					page={Math.floor(skip / limit) + 1}
					onChange={(_e, value) => setSkip((value - 1) * limit)}
					color="primary"
					variant="outlined"
					sx={{ alignSelf: 'center', mt: 2 }}
				/>
			)}
		</Stack>
	);
};

export default LibraryWorksheetSearch;
