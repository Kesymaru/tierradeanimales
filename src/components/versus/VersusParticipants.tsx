import React, {FunctionComponent, useState, ChangeEvent, useEffect} from "react";

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";

import {IStudent, IVersus} from "../../store";

const STUDENTS: IStudent[] = [
    {
        uid: '00001',
        displayName: 'Student 1',
        email: 'student@test.com',
        photoURL: '',
    },
    {
        uid: '00002',
        displayName: 'Student 2',
        email: 'student@test.com',
        photoURL: '',
    },
    {
        uid: '00003',
        displayName: 'Student 3',
        email: 'student@test.com',
        photoURL: '',
    },
    {
        uid: '00004',
        displayName: 'Student 4',
        email: 'student@test.com',
        photoURL: '',
    },
];

function not(a: IStudent[], b: IStudent[]): IStudent[] {
    return a.filter(student => b.indexOf(student) === -1);
}

function intersection(a: IStudent[], b: IStudent[]): IStudent[] {
    return a.filter(student => b.indexOf(student) !== -1);
}

function union(a: IStudent[], b: IStudent[]): IStudent[] {
    return [...a, ...not(b, a)];
}

interface IVersusParticipantsProps {
    versus: IVersus;
    setVersus: Function;
    setValid: Function;
}

const VersusParticipants: FunctionComponent<IVersusParticipantsProps> = ({versus, setVersus, setValid}) => {
    const [checked, setChecked] = useState<IStudent[]>([]);
    const [available, setAvailable] = useState<IStudent[]>([...STUDENTS]);
    const [included, setIncluded] = useState<IStudent[]>([]);

    const leftChecked = intersection(checked, available);
    const rightChecked = intersection(checked, included);

    function handleToggle(item: IStudent) {
        return (): void => {
            const currentIndex = checked.indexOf(item);
            const newChecked = [...checked];

            currentIndex === -1
                ? newChecked.push(item)
                : newChecked.splice(currentIndex, 1);

            setChecked(newChecked);
        }
    };

    function numberOfChecked(students: IStudent[]): number {
        return intersection(checked, students).length
    }

    function handleToggleAll(students: IStudent[]) {
        return (): void => numberOfChecked(students) === students.length
            ? setChecked(not(checked, students))
            : setChecked(union(checked, students));
    }

    function handleCheckedRight(): void {
        let _included = included.concat(leftChecked);
        setIncluded(_included);
        setAvailable(not(available, leftChecked));
        setChecked(not(checked, leftChecked));

        setVersus({...versus, ...{participants: _included}});
        setValid(!!_included.length);
    }

    function handleCheckedLeft(): void {
        let _included = not(included, rightChecked);
        setAvailable(available.concat(rightChecked));
        setIncluded(_included);
        setChecked(not(checked, rightChecked));

        setVersus({...versus, ...{participants: _included}});
        setValid(!!_included.length);
    }

    function filter(data: IStudent[], setFilter: Function) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            console.log('filter available', event.target.value);
            setFilter(event.target.value);
        }
    }

    interface IListProps extends Omit<CustomListProps, 'title'|'students'>{}
    let listProps: IListProps = {handleToggleAll, numberOfChecked, handleToggle, checked};

    return <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
    >
        <Grid item>
            <CustomList title="Available" students={available} {...listProps} />
        </Grid>
        <Grid item>
            <Grid container direction="column" alignItems="center">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
            </Grid>
        </Grid>
        <Grid item>
            <CustomList title="Chosen" students={included} {...listProps} />
        </Grid>
    </Grid>;
};

interface CustomListProps {
    title: string;
    students: IStudent[];
    checked: IStudent[];
    handleToggleAll: Function;
    numberOfChecked: Function;
    handleToggle: Function;
}
function CustomList({title, students, checked, handleToggleAll, numberOfChecked, handleToggle}: CustomListProps) {
    const [filter, setFilter] = useState<string>('');
    const [data, setData] = useState<IStudent[]>([...students]);

    useEffect(() => {
        console.log("use effect", students);
        setData(students);
    }, [students]);

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        setFilter(value);

        value
            ? setData(data.filter(student => (new RegExp(value)).test(student.displayName)))
            : setData(students);
    }

    return <Card>
        <CardHeader
            avatar={
                <Checkbox
                    onClick={handleToggleAll(students)}
                    checked={numberOfChecked(students) === students.length && students.length !== 0}
                    indeterminate={numberOfChecked(students) !== students.length && numberOfChecked(students) !== 0}
                    disabled={students.length === 0}
                    inputProps={{'aria-label': 'all items selected'}}
                />
            }
            title={title}
            subheader={`${numberOfChecked(students)}/${students.length} selected`}
        />
        <CardActions>
            <TextField
                name={`${title}-filter`}
                label={`Filter ${title}`}
                value={filter}
                onChange={handleFilter}
            />
        </CardActions>
        <Divider/>
        <List dense component="div" role="list">
            {data.map((student: IStudent) => {
                const labelId = `transfer-list-all-item-${student}-label`;

                return (
                    <ListItem
                        key={student.uid}
                        role="listitem"
                        button
                        onClick={handleToggle(student)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(student) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        </ListItemIcon>
                        <ListItemText
                            id={labelId}
                            primary={student.displayName}/>
                    </ListItem>
                );
            })}
            <ListItem/>
        </List>
    </Card>;
}

export default VersusParticipants;
