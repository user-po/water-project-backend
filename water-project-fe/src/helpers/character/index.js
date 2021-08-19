import store from "../../store";
export const isAdmin = () => {
  const uc = store.state.userCharacter;
  //console.log(uc.name)
  return uc.name === 'admin';
};
export const getCharacterInfoById = id => {
  const { characterInfo } = store.state;
  console.log(characterInfo,store.state.characterInfo)
  const one = characterInfo.find(item => {
    return item._id === id;
  });

  return one || {
        title: '未知角色 '
  }
};
