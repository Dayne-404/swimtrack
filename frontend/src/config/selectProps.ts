const ITEM_HEIGHT = 48;
const MAX_ITEMS_DISPLAYED = 5;

const SelectMenuProps = {
	MenuProps: {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * MAX_ITEMS_DISPLAYED,
			},
		},
	},
};

export default SelectMenuProps;
