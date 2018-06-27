const _ = require("lodash");
let isInvul = require("../parsers/isInvul");

module.exports = function persistenceCheck(pkg) {
  //Define
  let state = _.cloneDeep(pkg.state);
  let { caster, char } = pkg;
  let turnid = state.turnid;
  let casterChar = state[caster.team].char[caster.id];
  let skill = casterChar.skills[pkg.skill];
  let persistence = skill.persistence;
  //Return
  if (persistence === "action") {
    let invul = isInvul({ char, skill });
    if (invul) {
      return {
        state: state,
        status: true
      };
    }
  }
  if (persistence === "control") {
    let invul = isInvul({ char, skill });
    if (invul) {
      // item.remove = true;
      char.status.onAttack = char.status.onAttack.filter(
        x =>
          !(
            x.caster.id === caster.id &&
            x.caster.team === caster.team &&
            x.turnid === turnid
          )
      );
      char.status.onReceive = char.status.onReceive.filter(
        x =>
          !(
            x.caster.id === caster.id &&
            x.caster.team === caster.team &&
            x.turnid === turnid
          )
      );
      char.status.onSkill = char.status.onSkill.filter(
        x =>
          !(
            x.caster.id === caster.id &&
            x.caster.team === caster.team &&
            x.turnid === turnid
          )
      );
      char.status.onState = char.status.onState.filter(
        x =>
          !(
            x.caster.id === caster.id &&
            x.caster.team === caster.team &&
            x.turnid === turnid
          )
      );
      return {
        state: state,
        status: true
      };
    }
  }
  return {
    state: state,
    status: false
  };
};
