import { useCallback, useState } from "react";
import Checkbox from "./Checkbox";

const checkboxList = [
    {
        label: 'p1',
        id: 1,
        checked: false,
        children: [
            {
                label: 'p1-c1',
                id: 2,
                checked: false,
                children: [
                    {
                        label: 'p1-c1-c1',
                        id: 3,
                        checked: false,
                        children: [],
                    },
                    {
                        label: 'p1-c1-c2',
                        id: 4,
                        checked: false,
                        children: [
                            {
                                label: 'p1-c1-c2-c1',
                                id: 5,
                                checked: false,
                                children: [],
                            },
                            {
                                label: 'p1-c1-c2-c2',
                                id: 6,
                                checked: false,
                                children: [
                                    {
                                        label: 'p1-c1-c2-c2-c1',
                                        id: 7,
                                        checked: false,
                                        children: [],
                                    },
                                    {
                                        label: 'p1-c1-c2-c2-c2',
                                        id: 8,
                                        checked: false,
                                        children: [],
                                    },
                                ],
                            },
                            {
                                label: 'p1-c1-c2-c3',
                                id: 9,
                                checked: false,
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'p1-c2',
                id: 10,
                checked: false,
                children: [],
            },
            {
                label: 'p1-c3',
                id: 11,
                checked: false,
                children: [],
            },
        ],
    },
    {
        label: 'p2',
        id: 12,
        checked: false,
        children: [
            {
                label: 'p2-c1',
                id: 13,
                checked: false,
                children: [],
            },
            {
                label: 'p2-c2',
                id: 14,
                checked: false,
                children: [],
            },
        ],
    },
    {
        label: 'p3',
        id: 15,
        checked: false,
        children: [
            {
                label: 'p3-c1',
                id: 16,
                checked: false,
                children: [],
            },
        ],
    },
    {
        label: 'p4',
        id: 17,
        checked: false,
        children: [],
    },
];

const contructParent = (config, parent = null) => {
    let i = 0;
    while (i < config.length) {
        config[i].parent = parent;
        if (config[i].children.length > 0) {
            contructParent(config[i].children, config[i].id);
        }
        i++;
    }

    return config;
}

const changeStateForAllChildren = (config, checked) => {
    let i = 0;
    while (i < config.length) {
        config[i].checked = checked;
        if (config[i].children.length > 0) {
            changeStateForAllChildren(config[i].children, checked);
        }
        i++;
    }

    return config;
}

const changeStateForAllParent = (parentConfigId, totalConfig) => {
    let parentConfig = findConfig(parentConfigId, totalConfig);
    if (parentConfig) {
        let checkedBoxes = parentConfig.children.filter(checkBox => checkBox.checked);
        parentConfig.checked = parentConfig.children.length === checkedBoxes.length;
        if (parentConfig.parent) {
            changeStateForAllParent(parentConfig.parent, totalConfig);
        }
    }
}

const checkAccordingly = (currentCheckBoxConfig, totalConfig) => {
    // TO UPDATE CHILDREN
    if (currentCheckBoxConfig.children.length) {
        changeStateForAllChildren(currentCheckBoxConfig.children, currentCheckBoxConfig.checked)
    }

    // TO UPDATE PARENT
    if (currentCheckBoxConfig.parent) {
        changeStateForAllParent(currentCheckBoxConfig.parent, totalConfig);
    }
}

const findConfig = (checkboxId, checkboxConfigs) => {
    let i = 0;
    while (i < checkboxConfigs.length) {
        if (checkboxConfigs[i].id === checkboxId) {
            return checkboxConfigs[i];
        } else if (checkboxConfigs[i].children.length > 0) {
            const value = findConfig(checkboxId, checkboxConfigs[i].children);
            if (value) {
                return value;
            }
        }
        i++;
    }
}

export default function App() {
    const [checkboxConfigs, setCheckBoxConfigs] = useState([...contructParent(checkboxList)])
    const changeHandler = useCallback((selectedId) => {
        let currentCheckBoxConfig = findConfig(selectedId, checkboxConfigs);
        currentCheckBoxConfig.checked = !currentCheckBoxConfig.checked;
        checkAccordingly(currentCheckBoxConfig, checkboxConfigs);

        setCheckBoxConfigs([...checkboxConfigs]);
    }, [checkboxConfigs]);

    return <div>{
        checkboxConfigs.map(el => <Checkbox key={el.id} config={el} onChange={changeHandler} />)
    }</div>
}