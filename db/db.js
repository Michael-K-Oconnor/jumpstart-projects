const db = require('./knex');

const getProjectInfo = project_id =>
  db('projects')
    .select()
    .where({ project_id });

const getSampleProjects = sample_ids =>
  db('projects')
    .select()
    .whereIn('project_id', sample_ids);

const makePledge = ({ project_id, pledge_amount, hasBacked }) =>
  db('projects')
    .where({ project_id })
    .increment({
      pledged: pledge_amount,
      backer_count: Number(!hasBacked)
    });

module.exports = {
  getSampleProjects,
  getProjectInfo,
  makePledge
};
