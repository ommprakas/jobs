import { ListItemIcon, ListItemText, ListItem } from "@material-ui/core";
import React from "react";
import { ArrowRightCircle } from "react-feather";

const items = [
  {
    href: "/app/",
    icon: ArrowRightCircle,
    title: "Enquiry",
    status: true,
  },
];

export const DashboardSidebar = () => {
  const content = items.map((item, index) => {
    return (
      <div key={index}>
        <ListItem key={item.title}>
          <ListItemIcon style={{ marginRight: "-25px" }}>
            <item.icon size={15} />
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      </div>
    );
  });

  return content;
};
