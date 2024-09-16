import { useContext, useState } from 'react';
import { Stack, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import WorksheetHeaderInputs from '../components/inputs/WorksheetHeaderInputs';
import StudentTable from '../components/inputs/StudentTable';
import WorksheetFooterInputs from '../components/inputs/WorksheetFooterInputs';
import ViewHeader from '../components/layout/ViewHeader';

import { newWorksheet } from '../config/worksheetType';
import { SkillDescription } from '../config/levelSkillDescriptions';
import { WORKSHEET_VALUES } from '../config/worksheetData';
import { AlertContext } from '../App';
import { validateFields } from '../helper/validate';
import {
	submitNewWorksheet,
	submitUpdatedWorksheet,
} from '../helper/submitWorksheet';
interface CreateViewProps {
	defaultValues?: Partial<newWorksheet>;
	worksheetId?: string;
	disabled?: boolean;
	setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_HEADER_VALUES: newWorksheet = {
	instructor: { _id: '66e0841ce781e4ee0b2602f1', name: 'Greg P' },
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

	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

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

			setIsLoading(false);
			if (result._id && !worksheetId) {
				showAlert('Sucessfully created worksheet', 'success');
				navigate(`/library/${result._id}`);
			} else {
				showAlert('Sucessfully updated worksheet', 'success');
				setDisabled && setDisabled(false);
			}
		} catch (error) {
			setIsLoading(false);
			const errorMesage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';

			showAlert(errorMesage || '', 'error');
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
				setGroupId={setSelectedGroupId}
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
