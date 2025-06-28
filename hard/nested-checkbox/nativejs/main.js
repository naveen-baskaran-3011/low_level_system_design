const checkboxList = [
  {
    label: "p1",
    id: 1,
    checked: false,
    children: [
      {
        label: "p1-c1",
        id: 2,
        checked: false,
        children: [
          {
            label: "p1-c1-c1",
            id: 3,
            checked: false,
            children: [],
          },
          {
            label: "p1-c1-c2",
            id: 4,
            checked: false,
            children: [
              {
                label: "p1-c1-c2-c1",
                id: 5,
                checked: false,
                children: [],
              },
              {
                label: "p1-c1-c2-c2",
                id: 6,
                checked: false,
                children: [
                  {
                    label: "p1-c1-c2-c2-c1",
                    id: 7,
                    checked: false,
                    children: [],
                  },
                  {
                    label: "p1-c1-c2-c2-c2",
                    id: 8,
                    checked: false,
                    children: [],
                  },
                ],
              },
              {
                label: "p1-c1-c2-c3",
                id: 9,
                checked: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        label: "p1-c2",
        id: 10,
        checked: false,
        children: [],
      },
      {
        label: "p1-c3",
        id: 11,
        checked: false,
        children: [],
      },
    ],
  },
  {
    label: "p2",
    id: 12,
    checked: false,
    children: [
      {
        label: "p2-c1",
        id: 13,
        checked: false,
        children: [],
      },
      {
        label: "p2-c2",
        id: 14,
        checked: false,
        children: [],
      },
    ],
  },
  {
    label: "p3",
    id: 15,
    checked: false,
    children: [
      {
        label: "p3-c1",
        id: 16,
        checked: false,
        children: [],
      },
    ],
  },
  {
    label: "p4",
    id: 17,
    checked: false,
    children: [],
  },
];

let childListMap = new Map();
let parentMap = new Map();

function createChildList(checkConfig) {
  if(checkConfig.children) {
    checkConfig.children.forEach(child => {
      if(!childListMap.has(checkConfig.id)) {
        childListMap.set(checkConfig.id, new Set());
      }

      childListMap.get(checkConfig.id).add(child.id);
      createChildList(child);
    })
  }
}

function updateChildren(childrenList, checked) {
  Array.from(childrenList).forEach(childId => {
      document.getElementById(childId).checked = checked;
      updateChildren(childListMap.get(parseInt(childId, 10)) || [], checked);
    })
}

function updateParent(checkboxId) {
  let parentId = parentMap.get(checkboxId)
  if(parentId) {
    let isAllChecked = true;
    Array.from(childListMap.get(parseInt(parentId, 10)) || []).forEach(childId => {
      if(!document.getElementById(childId).checked) {
        isAllChecked = false;
      }
    });

    document.getElementById(parentId).checked = isAllChecked;
    updateParent(parentId);
  }
}

function checkboxGenerator(currentCHList, parentId) {
  let str = '';
  currentCHList.forEach(checkBox => {
    createChildList(checkBox)
    parentMap.set(checkBox.id, parentId);
    str += `<div style="padding-left: 10px">
      <input id=${checkBox.id} type="checkbox" ${checkBox.checked ? 'checked' : ''} />
      <label for=${checkBox.id}>${checkBox.label}</label>

      ${checkBox.children ? checkboxGenerator(checkBox.children, checkBox.id) : ''}
    </div>`

  })

  return str;
}

document.querySelector('#project_placeholder').innerHTML = checkboxGenerator(checkboxList);

document.querySelectorAll('input[type="checkbox"]').forEach(chBox => {
  chBox.addEventListener('change',(event) => {
    updateChildren(childListMap.get(parseInt(event.target.id, 10)) || [], event.target.checked);

    updateParent(parseInt(event.target.id, 10))
  });
})
