// *** AUTOMATICALLY IMPORT/ADD VUEX MODULES TO "/store/index.js" ***

function toCamelCase (str) {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
}

const requireModule = require.context('./', true, /\.js$/) // extract js files inside modules folder
const modules = {}

console.log('X>', requireModule.keys())
requireModule.keys().forEach(fileName => {
  if (fileName === './index.js' || // skip the root index.js file in the modules folder
    fileName.includes('getters') || // skip the getters.js in a module folder
    fileName.includes('mutations') || // skip the mutations.js in a module folder
    fileName.includes('states') || // skip the states.js in a module folder
    fileName.includes('actions.js') // skip the actions.js in a module folder
  ) return

  const moduleName = toCamelCase(fileName.replace(/(\.\/|index\.js)/g, '')) // camel case the module name

  modules[moduleName] = requireModule(fileName).default
})
export default modules
