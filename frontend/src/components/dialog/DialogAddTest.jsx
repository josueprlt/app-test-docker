import {useState, useEffect} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InfoOptionLaunch from "../InfoOptionLaunch";
import {RegexForTitle} from "../../utils/RegexForTitle";

const DialogAddTest = ({data = [], open, handleCloseDialog, setSelectedTests, selectedTests}) => {
    const [filteredTests, setFilteredTests] = useState([]);

    const handleRegexNewTitle = (name) => {
        let result = RegexForTitle(name);
        return result.newTitle;
    }

    const handleRegexArgs = (name) => {
        let result = RegexForTitle(name);
        return result.args;
    }

    const handleSelectTest = (test) => {
        setSelectedTests((prev) => [...prev, test]);
        handleCloseDialog();
    };
    useEffect(() => {
        if (data && data.length > 0) {
            setFilteredTests(
                data.filter(test => !selectedTests.some(sel => sel.type === test.type))
            )
        }
    }, [data, selectedTests])

    return (
        <Dialog onClose={handleCloseDialog} open={open}>
            <DialogTitle>Ajouter un test</DialogTitle>
            <List sx={{pt: 0}}>
                {filteredTests.map((test, idx) => (
                    <ListItem disablePadding key={idx}>
                        <ListItemButton className="gap-5 items-center" onClick={() => handleSelectTest(test)}>
                            <ListItemText primary={handleRegexNewTitle(test.name)}/>
                            <InfoOptionLaunch optionsChoice={handleRegexArgs(test.name)}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export default DialogAddTest;
