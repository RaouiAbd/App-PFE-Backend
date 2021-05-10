import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LstItemIcon from "./sections/LstItemIcon";
import LstItemAvatar from "./sections/LstItemAvatar";


const ListItems = props => {
    const { data, type, divider, button } = props;

    return (
        <>
            {data.map(item => (
                <ListItem divider={divider} button={button} key={item.id}>
                    <React.Fragment>
                        {type === "LstItemIcon" && <LstItemIcon item={item} />}

                        {type === "LstItemAvatar" && <LstItemAvatar item={item} />}

                        {type === "ListItemText" && (
                            <ListItemText
                                primary={item.title}
                                secondary={item.start ? item.start : ""}
                            />
                        )}
                    </React.Fragment>
                </ListItem>
            ))}
        </>
    );
};

export default ListItems;
