import HeaderUtilityButton from "@components/Header/HeaderUtilityButton";

import BellIcon from "@assets/images/icons/bell.svg?react";

interface indexProps {}

const index = (props: indexProps) => {
	return (
		<HeaderUtilityButton
			icon={<BellIcon />}
			onClick={() => {
				alert("Notifications clicked");
			}}
			tooltip="Notification"
		/>
	);
};

export default index;
