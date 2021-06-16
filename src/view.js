/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const appinfo = require('../package.json');
const settings = require('./settings.json');

/**
 * Obtiene la información de los módulos instalados.
 *
 * @param {String} baseUrl Localización base de aplicación.
 * @returns {array} Listado de módulos.
 */
function getModulesFromSettings(baseUrl) {
  return settings.modules.map((dmodule) => ({
    module: dmodule.name,
    type: dmodule.type,
    url: dmodule.url ? `${baseUrl}${dmodule.url}` : '',
  }));
}

module.exports = {

  /**
     * Vista principal
     *
     * @param {Object} req Request
     * @param {Object} res Request
     */
  index(req, res) {
    const info = Object.keys(appinfo).reduce((info, second) => {
      if (['name', 'version', 'description', 'repository', 'author', 'license'].indexOf(second) > -1) {
        info[second] = appinfo[second];
      }
      return info;
    }, {});
    info.modules = getModulesFromSettings(`${req.protocol}://${req.get('host')}`);
    res.json(info);
  },

  /**
     * Vista principal
     *
     * @param {Object} req Request
     * @param {Object} res Request
     */
  status(req, res) {
    res.send('pagina de estado');
  },

};
