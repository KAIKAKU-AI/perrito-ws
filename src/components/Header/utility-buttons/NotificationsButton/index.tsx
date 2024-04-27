import HeaderUtilityButton from "@components/Header/HeaderUtilityButton";

import BellIcon from "@assets/images/icons/bell.svg?react";

const index = () => {
	return (
		<HeaderUtilityButton
			icon={<BellIcon />}
			onClick={() => {
				console.warn("Coming soon!");
			}}
			tooltip="Notification"
		/>
	);
};

export default index;
