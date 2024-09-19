import {
	SkillDescription,
	WORKSHEET_SKILL_DESCRIPTIONS,
} from './levelSkillDescriptions';

export interface WorksheetLevel {
	names: string[];
	descriptions: SkillDescription[];
}
export const WORKSHEET_LEVEL_NAMES: string[] = [
	'Parent and Tot 1',
	'Parent and Tot 2',
	'Parent and Tot 3',
	'Preschool 1',
	'Preschool 2',
	'Preschool 3',
	'Preschool 4',
	'Preschool 5',
	'Swimmmer 1',
	'Swimmmer 2',
	'Swimmmer 3',
	'Swimmmer 4',
	'Swimmmer 5',
	'Swimmmer 6',
	'Rookie',
	'Ranger',
	'Star',
	'Teen',
	'Adult 1',
	'Adult 2',
	'Adult 3',
];

export const WORKSHEET_LEVELS: WorksheetLevel = {
	names: WORKSHEET_LEVEL_NAMES,
	descriptions: WORKSHEET_SKILL_DESCRIPTIONS,
};

export interface WorksheetValues {
	levels: WorksheetLevel;
	sessions: string[];
	days: string[];
	locations: string[];
}

export const WORKSHEET_VALUES: WorksheetValues = {
	levels: WORKSHEET_LEVELS,
	sessions: ['Spring', 'Summer', 'Fall', 'Winter'],
	days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Weekly'],
	locations: ['Rec', 'Dun'],
};
