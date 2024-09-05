import { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Adjust path as necessary
import SideNav from './SideNav'; // Adjust path as necessary

type NavigationProp = {
	isMediumOrBelow: boolean;
	smallSideNavWidth: number;
	largeSideNavWidth: number;
	navbarHeight: number;
	routes: object;
};

const Navigation = ({
	isMediumOrBelow,
	smallSideNavWidth,
	largeSideNavWidth,
	navbarHeight,
	routes,
}: NavigationProp) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	useEffect(() => {
		if (isMediumOrBelow) {
			setDrawerOpen(false); // Ensure drawer is closed on small screens
		}
	}, [isMediumOrBelow]);

	return (
		<>
			<Navbar
				isMediumOrBelow={isMediumOrBelow}
				height={navbarHeight}
				onDrawerToggle={handleDrawerToggle}
			/>
			<SideNav
				open={drawerOpen}
				onDrawerToggle={handleDrawerToggle}
				smallWidth={smallSideNavWidth}
				largeWidth={largeSideNavWidth}
				routes={routes}
			/>
			{/* Main content of your app goes here */}
		</>
	);
};

export default Navigation;
