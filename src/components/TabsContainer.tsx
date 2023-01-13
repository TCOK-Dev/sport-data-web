import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { FC, PropsWithChildren, ReactNode, useMemo } from "react";

const TabsContainer: FC<PropsWithChildren<{ data?: Array<{ label: string; node: ReactNode }> }>> = ({ data = [] }) => {
	const [value, setValue] = React.useState(0);

	const selectedNode = useMemo(() => data?.find((tab, tabIndex) => tabIndex === value), [data, value]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return data.length ? (
		<Stack spacing={1}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{data.map((tab, tabIndex) => (
						<Tab key={tabIndex} label={tab.label} />
					))}
				</Tabs>
			</Box>
			{selectedNode?.node ?? null}
		</Stack>
	) : null;
};

export default TabsContainer;
