export const FILTERS = {
	levels: {
		parentAndTot: { name: 'Parent and Tot', levelNumber: [1, 2, 3] },
		preschool: { name: 'Preschool', levelNumber: [1, 2, 3, 4, 5] },
		swimmer: { name: 'Swimmer', levelNumber: [1, 2, 3, 4, 5, 6] },
		adult: { name: 'Adult', levelNumber: [1, 2, 3] },
	},
    sessions: ['Spring', 'Summer', 'Winter', 'Fall'],
    days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Weekly'],
    locations: ['Rec', 'Dun']
};

export const getLevels = (): string[] => {
    return Object.values(FILTERS.levels).flatMap(({ name, levelNumber }) =>
        levelNumber.map(level => `${name} ${level}`)
    );
}

export const getLevelsNoFormat = (): string[] => {
    return Object.values(FILTERS.levels).flatMap(({ name, levelNumber }) =>
        levelNumber.map(level => `${name.toLowerCase()}${level}`)
    );
}
