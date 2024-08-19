import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const MuiAccordian = () => {
	const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (isExpanded: boolean, panel: string) => {
        setExpanded(isExpanded ? panel : false);
    }

	return (
		<Box width="250px">
			<Accordion
				expanded={expanded === 'panel1'}
				onChange={(_event, isExpanded) =>
					handleChange(isExpanded, 'panel1')
				}
			>
				<AccordionSummary
					id="panel1-header"
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Accordion 1</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Ex, voluptates? Consequatur, sapiente dolores
						ullam velit quibusdam sed molestiae voluptatibus
						architecto soluta, id vel distinctio sint tenetur
						eligendi ab reiciendis expedita.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel2'}
				onChange={(_event, isExpanded) =>
					handleChange(isExpanded, 'panel2')
				}
			>
				<AccordionSummary
					id="panel2-header"
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Accordion 2</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Ex, voluptates? Consequatur, sapiente dolores
						ullam velit quibusdam sed molestiae voluptatibus
						architecto soluta, id vel distinctio sint tenetur
						eligendi ab reiciendis expedita.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel3'}
				onChange={(_event, isExpanded) =>
					handleChange(isExpanded, 'panel3')
				}
			>
				<AccordionSummary
					id="panel3-header"
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Accordion 3</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Ex, voluptates? Consequatur, sapiente dolores
						ullam velit quibusdam sed molestiae voluptatibus
						architecto soluta, id vel distinctio sint tenetur
						eligendi ab reiciendis expedita.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default MuiAccordian;
