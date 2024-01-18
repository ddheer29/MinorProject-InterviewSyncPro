import React from 'react'
import {
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

const RadioButton = ({ hangleToggleComponent }) => {

    return (
        <Card className="w-full h-10 w-50">
            <List className="flex-row h-10">
                <ListItem className="p-0">
                    <label
                        htmlFor="horizontal-list-react"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                        onClick={() => hangleToggleComponent('A')}
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                name="horizontal-list"
                                id="horizontal-list-react"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="font-medium text-blue-gray-400"
                        >
                            CodeEditor
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="p-0">
                    <label
                        htmlFor="horizontal-list-vue"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                        onClick={() => hangleToggleComponent('B')}
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                name="horizontal-list"
                                id="horizontal-list-vue"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="font-medium text-blue-gray-400"
                        >
                            WhiteBoard
                        </Typography>
                    </label>
                </ListItem>
            </List>
        </Card>
    )
}

export default RadioButton