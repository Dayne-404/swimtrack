import { useContext, useState } from 'react';
import { Stack, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import WorksheetHeaderInputs from '../components/layout/create/WorksheetHeaderInputs';
import StudentTable from '../components/layout/create/StudentTable';
import WorksheetFooterInputs from '../components/layout/create/WorksheetFooterInputs';
import ViewHeader from '../components/layout/main/ViewHeader';

import { newWorksheet } from '../config/worksheetType';
import { SkillDescription } from '../config/levelSkillDescriptions';
import { WORKSHEET_VALUES } from '../config/worksheetData';
import { AlertContext } from '../App';
import { validateFields } from '../helper/validate';
import {
	submitNewWorksheet,
	submitUpdatedWorksheet,
	submitWorksheetToGroups,
} from '../helper/submit';
interface CreateViewProps {
	defaultValues?: Partial<newWorksheet>;
	worksheetId?: string;
	disabled?: boolean;
	setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_HEADER_VALUES: newWorksheet = {
	instructor: { _id: '66e083d5e781e4ee0b2602e7', name: 'Dayne D' },
	level: null,
	session: null,
	day: null,
	time: '',
	year: '',
	location: null,
	students: [],
};

const CreateView = ({
	worksheetId = '',
	defaultValues = {},
	setDisabled,
	disabled = false,
}: CreateViewProps) => {
	const navigate = useNavigate();
	const showAlert = useContext(AlertContext);

	const [header, setHeader] = useState<newWorksheet>({
		...DEFAULT_HEADER_VALUES,
		...defaultValues,
	});

	const [skills, setSkills] = useState<SkillDescription>(
		defaultValues.level || defaultValues.level === 0
			? WORKSHEET_VALUES.levels.descriptions[defaultValues.level]
			: []
	);

	const [selectedGroups, setSelectedGroups] = useState<
		{ id: string; name: string }[]
	>([]);

	const [loading, setIsLoading] = useState<boolean>(false);
	const [validationErrors, setValidationErrors] = useState<{
		[key: string]: string;
	}>({});

	const submit = async () => {
		const fieldErrors = validateFields(header);
		if (Object.keys(fieldErrors).length > 0) {
			setValidationErrors(fieldErrors);
			return;
		}

		try {
			setIsLoading(true);

			const result = !worksheetId
				? await submitNewWorksheet(header)
				: await submitUpdatedWorksheet(worksheetId, header);

			if (result._id && !worksheetId) {
				if(selectedGroups.length > 0)
					addToGroup(result._id);
				showAlert('Sucessfully created worksheet', 'success');
				setIsLoading(false);
				navigate(`/library/${result._id}`);
			} else {
				if(selectedGroups.length > 0 && worksheetId)
					addToGroup(worksheetId);
				showAlert('Sucessfully updated worksheet', 'success');
				setDisabled && setDisabled(false);
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			const errorMesage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';

			showAlert(errorMesage || '', 'error');
		}
	};

	const addToGroup = async (worksheetId: string) => {
		try {
			submitWorksheetToGroups(
				worksheetId,
				selectedGroups.map((group) => group.id)
			);
		} catch {
			console.error('ERROR ADDING TO GROUPS');
		}
	};

	const resetTable = () => {
		setHeader((prevValues) => ({
			...prevValues,
			level: null,
			students: [],
		}));

		setSkills([]);
	};

	return (
		<Stack width="100%" spacing={2}>
			<ViewHeader text="Create" />
			<WorksheetHeaderInputs
				values={header}
				selectedGroups={selectedGroups}
				setSelectedGroups={setSelectedGroups}
				setHeader={setHeader}
				setSkills={setSkills}
				errors={validationErrors}
				disabled={disabled || loading}
			/>
			<Divider />
			{header.students.length > 0 && skills && (
				<>
					<Stack alignItems="flex-end" mx={2} height={40}>
						{(!worksheetId || !disabled) && (
							<IconButton onClick={resetTable}>
								<CloseIcon />
							</IconButton>
						)}
					</Stack>
					<StudentTable
						values={header}
						setHeader={setHeader}
						skills={skills}
						errors={validationErrors}
						disabled={disabled || loading}
					/>
					{!disabled && (
						<WorksheetFooterInputs
							setHeader={setHeader}
							numSkills={skills.length}
							submit={submit}
							loading={loading}
						/>
					)}
				</>
			)}
		</Stack>
	);
};

export default CreateView;
