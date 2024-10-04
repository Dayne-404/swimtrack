import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	Tabs,
	Box,
	Tab,
	Stack,
	Link,
} from '@mui/material';
import { WORKSHEET_LEVELS } from '../config/worksheetData';
import ViewHeader from '../components/layout/main/ViewHeader';
import { useState } from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

const ProgramView = () => {
	const [value, setValue] = useState<number>(0);
	const { names, descriptions } = WORKSHEET_LEVELS;

	// Grouped data for tabs and accordions
	const programs = [
		{
			label: 'Parent & Tot',
			names: names.slice(0, 3),
			descriptions: descriptions.slice(0, 3),
		},
		{
			label: 'Preschool',
			names: names.slice(3, 8),
			descriptions: descriptions.slice(3, 8),
		},
		{
			label: 'Swimmer',
			names: names.slice(8, 14),
			descriptions: descriptions.slice(8, 14),
		},
		{
			label: 'Leadership',
			names: names.slice(14, 17),
			descriptions: descriptions.slice(14, 17),
		},
		{
			label: 'Adult',
			names: names.slice(17, 21),
			descriptions: descriptions.slice(17, 21),
		},
		{
			label: 'Fitness',
			names: [names[names.length - 1]],
			descriptions: [descriptions[descriptions.length - 1]],
		},
	];

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack width="100%">
			<ViewHeader text="Programs" />
			<Divider />

			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="Programs Tabs">
						{programs.map((program, index) => (
							<Tab key={index} label={program.label} />
						))}
					</Tabs>
				</Box>

				{programs.map((program, tabIndex) => (
					<CustomTabPanel key={tabIndex} value={value} index={tabIndex}>
						{program.names.map((name, accIndex) => (
							<Accordion
								key={accIndex}
								sx={{ fontFamily: 'Lexend, Arial, sans-serif' }}
							>
								<AccordionSummary>{name}</AccordionSummary>
								<AccordionDetails>
									{program.descriptions[accIndex].map(
										(line: string, lineIndex: number) => (
											<div key={lineIndex}>
												{lineIndex}. {line}
											</div>
										)
									)}
								</AccordionDetails>
							</Accordion>
						))}
					</CustomTabPanel>
				))}
				<Link
					href="https://www.lifesaving.org/member-services/delivery-system/test-sheets"
					target="_blank"
					rel="noopener"
					sx={{ fontFamily: 'Lexend, Arial, sans-serif' }}
				>
					Extra resources
				</Link>
			</Box>
		</Stack>
	);
};

export default ProgramView;
