const db = require('./knex');

const getProjectInfo = projectId =>
  db('projects')
    .select()
    .where({ projectId });

const getSampleProjects = sampleIds =>
  db('projects')
    .select()
    .whereIn('projectId', sampleIds);

const makePledge = ({ projectId, pledgeAmount, hasBacked }) =>
  db('projects')
    .where({ projectId })
    .increment({
      pledged: pledgeAmount,
      backer_count: Number(!hasBacked)
    });

module.exports = {
  getSampleProjects,
  getProjectInfo,
  makePledge
};
