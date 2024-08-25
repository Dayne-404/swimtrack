import {
	Paper,
	Box,
	Typography,
	Divider,
	Stack,
	Button,
	MenuItem,
	TextField,
	Grid,
	ButtonBase,
} from '@mui/material';
import { FILTERS, getLevels } from '../config/filters';
import SearchBar from '../components/SearchBar';
import { useRef, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterModal from '../components/FilterModal';
import { CARDS } from '../config/cards';
import WorksheetCard from '../components/WorksheetCard';

const Library = () => {
	const levels = getLevels();

	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [sortOption, setSortOption] = useState<string>('');
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const handleFilterSelect = (filter: string) => {
		setSelectedFilters([...selectedFilters, filter]);
	};

	const handleFilterRemove = (filter: string) => {
		setSelectedFilters(
			selectedFilters.filter((selected) => selected !== filter)
		);
	};

	const clearFilters = () => {
		setSelectedFilters([]);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollToTop = () => {
		if (containerRef.current) {
			containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<Box display="flex" flexDirection="column" flex={1}>
			<FilterModal
				filters={FILTERS}
				levels={levels}
				selectedFilters={selectedFilters}
				isModalOpen={modalOpen}
				handleModalClose={handleModalClose}
				handleFilterSelect={handleFilterSelect}
				handleFilterRemove={handleFilterRemove}
				clearFilters={clearFilters}
			/>

			<Box mb={2}>
				<ButtonBase disableRipple onClick={scrollToTop}>
					<Typography variant="h5">Library</Typography>
				</ButtonBase>
			</Box>

			<Paper
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'auto',
					padding: 1.5,
				}}
				ref={containerRef}
			>
				<Stack
					spacing={1}
					sx={{
						flex: 1,
					}}
				>
					<SearchBar
						size="small"
						width="100%"
						placeholderText="Search"
					/>
					<Stack direction="row" spacing={1}>
						<Button
							variant="outlined"
							onClick={() => setModalOpen(true)}
							startIcon={<FilterAltIcon />}
							size="small"
							fullWidth
						>
							Filter
						</Button>
						<TextField
							size="small"
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							fullWidth
							select
							sx={{
								textAlign: 'center',
								'& .MuiOutlinedInput-root': {
									'& fieldset': { color: 'red' },
								},
							}}
							SelectProps={{
								displayEmpty: true,
							}}
						>
							<MenuItem key="sort" value="" disabled>
								Sort
							</MenuItem>
							<MenuItem key="newest" value="newest">
								Newest
							</MenuItem>
							<MenuItem key="oldest" value="oldest">
								Oldest
							</MenuItem>
						</TextField>
					</Stack>
					<Divider />
					<Box flex={1} overflow="auto">
						<Grid container>
							{CARDS.map((card, index) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									p={0.5}
									key={index}
								>
									<WorksheetCard
										level={card.level}
										session={card.session}
										day={card.day}
										time={card.time}
										year={card.year}
										createdOn={card.createdOn}
									/>
								</Grid>
							))}
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								key={'button'}
								p={0.5}
								pt={2}
							></Grid>
						</Grid>
					</Box>
					<Button fullWidth variant="contained">
						View More
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
};

export default Library;
