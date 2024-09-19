import { Typography, Box } from "@mui/material";
import WorksheetGrid from "./WorksheetGrid";
import { Worksheet } from "../../config/worksheetType";

interface LibraryCardsProps {
    headerText?: string;
    worksheets: Worksheet[];
}

const LibraryCards = ({headerText, worksheets}: LibraryCardsProps) => {
	return (
		<Box width="100%">
			{headerText && <Typography variant="h6">{headerText}</Typography>}
			<WorksheetGrid worksheets={worksheets} includeInstructor={false} gridSpace={2} />
		</Box>
	);
};

export default LibraryCards;
