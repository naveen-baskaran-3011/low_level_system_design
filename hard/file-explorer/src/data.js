export const fileExplorerData = {
  id: "root",
  name: "root",
  isFolder: true,
  nodes: [
    {
      id: "1",
      name: "public",
      isFolder: true,
      nodes: [
        {
          id: "11",
          name: "images",
          isFolder: true,
          nodes: [
            {
              id: "111",
              name: "cover.png",
            },
            {
              id: "112",
              name: "icons",
              isFolder: true,
              nodes: [
                {
                  id: "1121",
                  name: "arrow.svg",
                },
              ],
            },
          ],
        },
        {
          id: "12",
          name: "public_nested_file",
        },
      ],
    },
    {
      id: "2",
      name: "src",
      isFolder: true,
      nodes: [
        {
          id: "21",
          name: "components",
          isFolder: true,
          nodes: [
            {
              id: "21",
              name: "index.js",
            },
            {
              id: "22",
              name: "index.html",
            },
            {
              id: "23",
              name: "index.css",
            },
          ],
        },
        {
          id: "22",
          name: "main.jsx",
        },
        {
          id: "23",
          name: "App.jsx",
        },
        {
          id: "24",
          name: "app.module.css",
        },
      ],
    },
    {
      id: "3",
      name: "dist",
      isFolder: true,
      nodes: [
        {
          id: "31",
          name: "index.js",
        },
        {
          id: "32",
          name: "index.html",
        },
        {
          id: "33",
          name: "index.css",
        },
      ],
    },
    {
      id: "4",
      name: "package.json",
      nodes: [],
    },
    {
      id: "5",
      name: "package-lock.json",
      nodes: [],
    },
  ],
};

export function configGenerator(config, parent = null) {
  config.parent = parent;
  if (config.nodes && config.nodes.length) {
    for (let node of config.nodes) {
      configGenerator(node, config.id);
    }
  }

  return config;
}

export function createConfig(type, id) {
  let config = {
    id: String(Date.now()),
    name: "Untitled file"
  }

  if (type === 'folder') {
    config = {
      ...config,
      isFolder: true,
      nodes: [],
      parent: id,
      name: "Untitle folder"
    }
  }

  return config;
}

export function findNode(config, nodeId) {
  if (config.id === nodeId) {
    return config;
  } else if (config.nodes && config.nodes.length) {
    for (let node of config.nodes) {
      let res = findNode(node, nodeId);
      if (res) {
        return res;
      }
    }
  }
}