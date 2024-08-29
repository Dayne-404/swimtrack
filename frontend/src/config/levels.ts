export type LevelKey =
	| 'parentAndTot1'
	| 'parentAndTot2'
	| 'parentAndTot3'
	| 'preschool1'
	| 'preschool2'
	| 'preschool3'
	| 'preschool4'
	| 'preschool5'
	| 'preschool6'
	| 'swimmer1'
	| 'swimmer2'
	| 'swimmer3'
	| 'swimmer4'
	| 'swimmer5'
	| 'swimmer6'
	| 'adult1'
	| 'adult2'
	| 'adult3';

interface LevelDescription {
	name: string;
	descriptions: string[];
}

interface Levels {
	[key: string]: LevelDescription;
}

export const SWIMMER1SKILLS = [
	'Enter and exit shallow water',
	'Jump into chest deep water',
	'Jump into water wearing PFD',
	'Tread water 30s wearing PFD',
	'Hold breath underwater 5s',
	'Submerge and Exhale 5 times',
	'Open eyes underwater',
	'Float on Front 5s',
	'Float on Back 5s',
	'Roll front to back and back to front',
	'Glide on front 3m',
	'Glide on back 3m',
	'Glide on side 3m',
	'Flutter kick on front 5m',
	'Flutter kick on back 5m',
	'Front crawl 5m wearing PFD',
	'Water smart message',
	'Water smart message',
	'Water smart message',
	'water smart message',
];

export const SWIMMER2SKILLS = [
	'Jump into deep water, return and exit',
	'Sideways entry wearing PFD',
	'Tread water 15 sec',
	'Recover object from bottom in chest deep water',
	'Wearing PFD jump into deep water tread 30s and swim/kick 15m',
	'Flutter kick on front 10m',
	'Flutter kick on back 10m',
	'Flutter kick on side 10m',
	'Whip kick in vertical position 30s with aid',
	'Front crawl 10m',
	'Back crawl 10m',
	'Interval training 4x5m flutter kick with 20s rests',
	'Water smart message',
	'Water smart message',
	'Water smart message',
	'Water smart message',
];

export const LEVELS: Levels = {
	parentAndTot1: { name: 'Parent and Tot 1', descriptions: SWIMMER1SKILLS },
	parentAndTot2: { name: 'Parent and Tot 2', descriptions: SWIMMER1SKILLS },
	parentAndTot3: { name: 'Parent and Tot 3', descriptions: SWIMMER1SKILLS },
	preschool1: { name: 'Preschool 1', descriptions: SWIMMER1SKILLS },
	preschool2: { name: 'Preschool 2', descriptions: SWIMMER1SKILLS },
	preschool3: { name: 'Preschool 3', descriptions: SWIMMER1SKILLS },
	preschool4: { name: 'Preschool 4', descriptions: SWIMMER1SKILLS },
	preschool5: { name: 'Preschool 5', descriptions: SWIMMER1SKILLS },
	preschool6: { name: 'Preschool 6', descriptions: SWIMMER1SKILLS },
	swimmer1: { name: 'Swimmer 1', descriptions: SWIMMER1SKILLS },
	swimmer2: { name: 'Swimmer 2', descriptions: SWIMMER2SKILLS },
	swimmer3: { name: 'Swimmer 3', descriptions: SWIMMER2SKILLS },
	swimmer4: { name: 'Swimmer 4', descriptions: SWIMMER2SKILLS },
	swimmer5: { name: 'Swimmer 5', descriptions: SWIMMER2SKILLS },
	swimmer6: { name: 'Swimmer 6', descriptions: SWIMMER2SKILLS },
	adult1: { name: 'Adult 1', descriptions: SWIMMER2SKILLS },
	adult2: { name: 'Adult 2', descriptions: SWIMMER2SKILLS },
	adult3: { name: 'Adult 3', descriptions: SWIMMER2SKILLS },
};

export const levelNames = Object.values(LEVELS).map((level) => level.name);

export const WORKSHEETS = {
	levels: LEVELS,
	sessions: ['spring', 'summer', 'winter', 'fall'],
	days: ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun', 'weekly'],
	locations: ['rec', 'dun'],
};
