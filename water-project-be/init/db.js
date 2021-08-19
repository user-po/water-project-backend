const mongoose = require('mongoose')
const {connect} = require('../src/db/index')
const {defaultCharacters} = require('../src/helpers/character')

const character = mongoose.model('Character')
const User = mongoose.model('User')
connect()
  .then(async ()=>{
      console.log('开始初始化 角色集合')
    const characterList = await character.insertMany(defaultCharacters)
    console.log('角色集合初始化完成')

    const user = new User({
      account:'admin',
      password:'123',
      character:characterList.find(item=>(item.name === 'admin'))._id
    })

    console.log('正在初始化用户:',user)
    await user.save();
    console.log('用户初始化完成')
  }) 