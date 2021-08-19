import {defineComponent,reactive} from 'vue'
import { UserOutlined,LockOutlined,MailOutlined } from '@ant-design/icons-vue';
import {auth,resetPassword} from '@/service'
import {result} from '@/helpers/utils'
import {message,Modal,Input} from 'ant-design-vue'
import store from '../../store';
import {useRouter} from 'vue-router'
import { getCharacterInfoById} from '@/helpers/character'
import { setToken,getToken } from '@/helpers/token';
import axios from 'axios';
export default defineComponent({
    components:{
        UserOutlined,
        LockOutlined,
        MailOutlined,
    },
    setup(){

        const router = useRouter();
        //注册用的表单数据
        const regForm = reactive({
            account:'',
            password:'',
            inviteCode:'',
            companyName:''
        })

        const forgetPassword = ()=>{
            Modal.confirm({
                title: `输入账号发起申请，管理员会审核`,
                okText: '确认',
                okType: 'primary',
                cancelText: '取消',
                content: (
                  <div>
                    <Input class="forget_password_account" />
                  </div>
                ),
                onOk: async () => {
                  const el = document.querySelector(".forget_password_account");
                let account = el.value;

                const res = await resetPassword.add(account)

                result(res)
                .success(({msg})=>{
                    message.success(msg)
                })
                
                }
              });
        }
        //注册逻辑
        const register = async ()=>{
            if(regForm.account === ''){
                message.info('请输入账户')
                return;
            }
            if(regForm.password === ''){
                message.info('请输入密码')
                return;
            }
            if(regForm.inviteCode === ''){
                message.info('请输入邀请码')
                return;
            }
            if(regForm.companyName === ''){
                message.info('请输入公司名')
                return;
            }
            const res = await auth.register(regForm.account,regForm.password,regForm.inviteCode,regForm.companyName)
            result(res)
            .success((data)=>{
                 message.success(data.msg)
            })
        }
        //登入用的表单数据
        const loginForm = reactive({
            account:'',
            password:'',
        })
        //登入逻辑
        const login = async ()=>{
            if(loginForm.account === ''){
                message.info('请输入账户')
                return;
            }
            if(loginForm.password === ''){
                message.info('请输入密码')
                return;
            }
            // const my = await auth.test();
            // console.log(my)
            const res = await auth.login(loginForm.account,loginForm.password)
            
            result(res)
            .success(async ({msg,data:{user,token}})=>{
                 message.success(msg)

                 await setToken(token)
                 axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;
                 await store.dispatch('getCharacterInfo');

                 store.commit('setUserInfo', user);
                 store.commit('setUserCharacter', getCharacterInfoById(user.character));
                
                 //await store.dispatch('getCharacterInfo');
                 //await store.dispatch('getUserInfo')
                 

                 
                 router.replace('/orders')
            })
           
        }
        return {
            regForm,
            register,
            loginForm,
            login,
            forgetPassword
           
        }
    }
    
})