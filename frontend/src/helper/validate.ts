import { newWorksheet } from "../config/worksheetType";

const CURRENT_YEAR = new Date().getFullYear();

export const validateFields = (header: newWorksheet) => {
    const newErrors: { [key: string]: string } = {};
    const yearAsNum = Number(header.year);

    if (!header.instructor) newErrors.instructor = 'Instructor is required';
    if (header.level === null) newErrors.level = 'Level is required';
    if (header.session === null) newErrors.session = 'Session is required';
    if (!header.year || yearAsNum < 2000 || yearAsNum > CURRENT_YEAR) {
        newErrors.year = `Year must be in range 2000-${CURRENT_YEAR}`;
    }

    if (!header.time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(header.time)) {
        newErrors.time = 'Time must be in HH:MM format';
    }
    if (header.day === null) newErrors.day = 'Day is required';
    if (header.location === null)
        newErrors.location = 'Location is required';
    if (!header.students || header.students.length === 0) {
        newErrors.students = 'At least one student must be added';
    } else {
        header.students.forEach((student, index) => {
            if (!student.name) {
                newErrors[`student-${index}-name`] =
                    'Student name is required';
            }
        });
    }

    //setValidationErrors(newErrors);
    //return Object.keys(newErrors).length === 0;
    return newErrors;
};