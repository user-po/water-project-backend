(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods"],{"135a":function(e,t,a){},"40a7":function(e,t,a){"use strict";var n=a("c31d"),c={today:"今天",now:"此刻",backToToday:"返回今天",ok:"确定",timeSelect:"选择时间",dateSelect:"选择日期",weekSelect:"选择周",clear:"清除",month:"月",year:"年",previousMonth:"上个月 (翻页上键)",nextMonth:"下个月 (翻页下键)",monthSelect:"选择月份",yearSelect:"选择年份",decadeSelect:"选择年代",yearFormat:"YYYY年",dayFormat:"D日",dateFormat:"YYYY年M月D日",dateTimeFormat:"YYYY年M月D日 HH时mm分ss秒",previousYear:"上一年 (Control键加左方向键)",nextYear:"下一年 (Control键加右方向键)",previousDecade:"上一年代",nextDecade:"下一年代",previousCentury:"上一世纪",nextCentury:"下一世纪"},r={placeholder:"请选择时间"},o=r,u={lang:Object(n["a"])({placeholder:"请选择日期",rangePlaceholder:["开始日期","结束日期"]},c),timePickerLocale:Object(n["a"])({},o)};u.lang.ok="确 定";t["a"]=u},a434:function(e,t,a){"use strict";var n=a("23e7"),c=a("23cb"),r=a("a691"),o=a("50c4"),u=a("7b0b"),l=a("65f0"),i=a("8418"),d=a("1dde"),s=d("splice"),b=Math.max,f=Math.min,O=9007199254740991,m="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!s},{splice:function(e,t){var a,n,d,s,j,p,v=u(this),h=o(v.length),g=c(e,h),y=arguments.length;if(0===y?a=n=0:1===y?(a=0,n=h-g):(a=y-2,n=f(b(r(t),0),h-g)),h+a-n>O)throw TypeError(m);for(d=l(v,n),s=0;s<n;s++)j=g+s,j in v&&i(d,s,v[j]);if(d.length=n,a<n){for(s=g;s<h-n;s++)j=s+n,p=s+a,j in v?v[p]=v[j]:delete v[p];for(s=h;s>h-n+a;s--)delete v[s-1]}else if(a>n)for(s=h-n;s>g;s--)j=s+n-1,p=s+a-1,j in v?v[p]=v[j]:delete v[p];for(s=0;s<a;s++)v[s+g]=arguments[s+2];return v.length=h-n+a,d}})},aab2:function(e,t,a){},ae19:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));a("7db0");var n=a("4360"),c=function(e){var t=n["a"].state.goodClassify.find((function(t){return t._id===e}));return t&&t.title||"未知分类"}},d471:function(e,t,a){"use strict";a("aab2")},d81d:function(e,t,a){"use strict";var n=a("23e7"),c=a("b727").map,r=a("1dde"),o=r("map");n({target:"Array",proto:!0,forced:!o},{map:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})},de6d:function(e,t,a){"use strict";a.r(t);var n=a("7a23"),c=Object(n["X"])("data-v-1a261008");Object(n["G"])("data-v-1a261008");var r=Object(n["m"])("h2",null,"商品列表",-1),o={class:"search"},u={class:"buttons"},l=Object(n["l"])("添加一条"),i={slot:"name","slot-scope":"text"},d={href:"javascript:;"},s=Object(n["l"])("删除"),b=Object(n["l"])("   "),f=Object(n["l"])("编辑"),O=Object(n["l"])("   "),m=Object(n["l"])("详情"),j=Object(n["m"])("div",null,null,-1);Object(n["E"])();var p=c((function(e,t,a,p,v,h){var g=Object(n["L"])("a-divider"),y=Object(n["L"])("a-input-search"),w=Object(n["L"])("a-button"),k=Object(n["L"])("space-between"),_=Object(n["L"])("a-popconfirm"),x=Object(n["L"])("a-image"),C=Object(n["L"])("a-table"),L=Object(n["L"])("a-pagination"),D=Object(n["L"])("a-card"),F=Object(n["L"])("add-one"),U=Object(n["L"])("update"),I=Object(n["M"])("only-admin");return Object(n["D"])(),Object(n["j"])("div",null,[Object(n["m"])(D,null,{default:c((function(){return[r,Object(n["m"])(g),Object(n["m"])(k,null,{default:c((function(){return[Object(n["m"])("div",o,[Object(n["m"])(y,{placeholder:"输入商品名查询","enter-button":"",value:e.keywords,"onUpdate:value":t[1]||(t[1]=function(t){return e.keywords=t}),onSearch:e.onSearch},null,8,["value","onSearch"]),e.isSearch?(Object(n["D"])(),Object(n["j"])("a",{key:0,href:"javascript:;",onClick:t[2]||(t[2]=function(){return e.backAll&&e.backAll.apply(e,arguments)})},"查询回退")):Object(n["k"])("",!0)]),Object(n["m"])("div",u,[Object(n["W"])(Object(n["m"])(w,{type:"primary",onClick:t[3]||(t[3]=function(t){return e.show=!0})},{default:c((function(){return[l]})),_:1},512),[[I]])])]})),_:1}),Object(n["m"])(g),Object(n["m"])(C,{columns:e.columns,"data-source":e.list,loading:e.loading,pagination:!1,bordered:""},{actions:c((function(t){return[Object(n["m"])(_,{title:"你确定要删除这个商品吗","ok-text":"确定","cancel-text":"取消",onConfirm:function(a){return e.confirm(t)},onCancel:e.cancel},{default:c((function(){return[Object(n["W"])(Object(n["m"])("a",d,[s],512),[[I]])]})),_:2},1032,["onConfirm","onCancel"]),b,Object(n["W"])(Object(n["m"])("a",{href:"javascript:;",onClick:function(a){return e.update(t)}},[f],8,["onClick"]),[[I]]),O,Object(n["W"])(Object(n["m"])("a",{href:"javascript:;",onClick:function(a){return e.toDetail(t)}},[m],8,["onClick"]),[[I]])]})),goodImg:c((function(e){var t=e.record;return[Object(n["m"])(x,{width:100,src:t.goodImgUrl},null,8,["src"])]})),stock:c((function(t){var a=t.record;return[Object(n["m"])("a",{href:"javascript:;",onClick:function(t){return e.editStock("IN_STOCK",a)}},"入库",8,["onClick"]),Object(n["l"])(" "+Object(n["O"])(a.stock)+" ",1),Object(n["m"])("a",{href:"javascript:;",onClick:function(t){return e.editStock("OUT_STOCK",a)}},"出库",8,["onClick"])]})),classify:c((function(t){var a=t.record;return[Object(n["l"])(Object(n["O"])(e.getClassifyTitleById(a.classify)),1)]})),default:c((function(){return[Object(n["m"])("a",i,Object(n["O"])(e.text),1)]})),_:1},8,["columns","data-source","loading"]),Object(n["m"])(k,{style:{"margin-top":"24px"}},{default:c((function(){return[j,Object(n["m"])(L,{current:e.curPage,"onUpdate:current":t[4]||(t[4]=function(t){return e.curPage=t}),total:e.total,"page-size":20,onChange:e.setPage},null,8,["current","total","onChange"])]})),_:1})]})),_:1}),Object(n["m"])(F,{show:e.show,"onUpdate:show":t[5]||(t[5]=function(t){return e.show=t}),onAdd:e.getList},null,8,["show","onAdd"]),Object(n["m"])(U,{show:e.showUpdateModal,"onUpdate:show":t[6]||(t[6]=function(t){return e.showUpdateModal=t}),good:e.curEditGood,onUpdatedGood:e.updatedGoods},null,8,["show","good","onUpdatedGood"])])})),v=a("1da1"),h=(a("96cf"),a("b0c0"),Object(n["X"])("data-v-652a4c90"));Object(n["G"])("data-v-652a4c90");var g=Object(n["l"])(" 选择上传 ");Object(n["E"])();var y=h((function(e,t,a,c,r,o){var u=Object(n["L"])("a-input"),l=Object(n["L"])("a-form-item"),i=Object(n["L"])("a-select-option"),d=Object(n["L"])("a-select"),s=Object(n["L"])("a-input-number"),b=Object(n["L"])("a-date-picker"),f=Object(n["L"])("upload-outlined"),O=Object(n["L"])("a-button"),m=Object(n["L"])("a-upload"),j=Object(n["L"])("a-form"),p=Object(n["L"])("a-modal");return Object(n["D"])(),Object(n["j"])("div",null,[Object(n["m"])(p,{visible:e.show,title:"添加商品",onOk:e.submit,onCancel:e.close,"ok-text":"确认","cancel-text":"取消","ok-button-props":{disabled:0===e.fileList.length}},{default:h((function(){return[Object(n["m"])(j,{"label-col":e.labelCol,"wrapper-col":e.wrapperCol},{default:h((function(){return[Object(n["m"])(l,{label:"商品名"},{default:h((function(){return[Object(n["m"])(u,{value:e.addForm.name,"onUpdate:value":t[1]||(t[1]=function(t){return e.addForm.name=t})},null,8,["value"])]})),_:1}),Object(n["m"])(l,{label:"商品分类"},{default:h((function(){return[Object(n["m"])(d,{placeholder:"请选择商品分类",value:e.addForm.classify,"onUpdate:value":t[2]||(t[2]=function(t){return e.addForm.classify=t})},{default:h((function(){return[(Object(n["D"])(!0),Object(n["j"])(n["b"],null,Object(n["J"])(e.store.goodClassify,(function(e){return Object(n["D"])(),Object(n["j"])(i,{key:e._id,value:e._id},{default:h((function(){return[Object(n["l"])(Object(n["O"])(e.title),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["value"])]})),_:1}),Object(n["m"])(l,{label:"商品价格"},{default:h((function(){return[Object(n["m"])(s,{min:0,max:99999,value:e.addForm.price,"onUpdate:value":t[3]||(t[3]=function(t){return e.addForm.price=t})},null,8,["value"])]})),_:1}),Object(n["m"])(l,{label:"商品过期时间"},{default:h((function(){return[Object(n["m"])(b,{"show-time":"",value:e.addForm.validityDate,"onUpdate:value":t[4]||(t[4]=function(t){return e.addForm.validityDate=t}),type:"date",locale:e.locale_date,placeholder:"选择过期时间",style:{width:"100%"},"disabled-date":e.disabledDate},null,8,["value","locale","disabled-date"])]})),_:1}),Object(n["m"])(l,{label:"商品折扣"},{default:h((function(){return[Object(n["m"])(s,{min:0,max:99999,value:e.addForm.discount,"onUpdate:value":t[5]||(t[5]=function(t){return e.addForm.discount=t})},null,8,["value"])]})),_:1}),Object(n["m"])(l,{label:"商品库存"},{default:h((function(){return[Object(n["m"])(s,{min:0,max:99999,value:e.addForm.stock,"onUpdate:value":t[6]||(t[6]=function(t){return e.addForm.stock=t})},null,8,["value"])]})),_:1}),Object(n["m"])(l,{label:"商品图片"},{default:h((function(){return[Object(n["m"])(m,{"file-list":e.fileList,remove:e.handleRemove,"before-upload":e.beforeUpload,multiple:!1},{default:h((function(){return[Object(n["m"])(O,null,{default:h((function(){return[Object(n["m"])(f),g]})),_:1})]})),_:1},8,["file-list","remove","before-upload"])]})),_:1})]})),_:1},8,["label-col","wrapper-col"])]})),_:1},8,["visible","onOk","onCancel","ok-button-props"])])})),w=a("2909"),k=(a("fb6a"),a("a434"),a("99af"),a("159b"),a("d81d"),a("c1df")),_=a.n(k),x=a("40a7"),C=(a("5c3a"),a("8e44")),L=a("e428"),D=a("f64c"),F=a("4360");_.a.locale("zh-cn");var U={name:"",price:0,classify:"",validityDate:0,discount:0,stock:0},I=Object(n["n"])({props:{show:Boolean},setup:function(e,t){var a=Object(n["I"])([]),c=Object(n["H"])(Object(L["a"])(U)),r=Object(n["I"])(!0);F["a"].state.goodClassify.length&&(c.classify=F["a"].state.goodClassify[0]._id);var o=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=Object(L["a"])(c),a.validityDate=new Date(c.validityDate).getTime(),a.name&&a.classify&&a.price&&a.stock&&a.validityDate){e.next=6;break}D["a"].error("请填写完整!"),e.next=12;break;case 6:return e.next=8,C["f"].add(a);case 8:return n=e.sent,e.next=11,i(n.data.data._id);case 11:Object(L["c"])(n).success((function(e,a){var n=a.data;Object.assign(c,U),D["a"].success(n.msg),b(),t.emit("add")}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=function(e){var t=a.value.indexOf(e),n=a.value.slice();n.splice(t,1),a.value=n},l=function(e){return a.value=[].concat(Object(w["a"])(a.value),[e]),!1},i=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){var n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new FormData,a.value.forEach((function(e){n.append("file",e),n.append("id",t)})),e.next=4,C["f"].upload(n);case 4:c=e.sent,console.log(c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(e){var t=Object(w["a"])(e.fileList);t=t.slice(-1),t=t.map((function(e){return e.response&&(e.url=e.response.url),e})),a.value=t},s=function(e){return e&&e<_()().endOf("day")},b=function(){t.emit("update:show",!1)};return{labelCol:{span:6},wrapperCol:{span:12},locale_date:x["a"],addForm:c,submit:o,props:e,close:b,disabledDate:s,store:F["a"].state,fileList:a,beforeUpload:l,handleRemove:u,handleUpload:i,handleChange:d,disabled:r}}});a("d471");I.render=y,I.__scopeId="data-v-652a4c90";var S=I,R=a("ed3b"),T=a("b558"),Y=a("e0c4"),V=a("6c02"),M=a("ae19"),G=Object(n["n"])({components:{AddOne:S,Update:Y["a"]},setup:function(){var e=Object(V["d"])(),t=[{title:"商品图片",slots:{customRender:"goodImg"}},{title:"商品名",dataIndex:"name"},{title:"商品价格",dataIndex:"price"},{title:"商品有效期",dataIndex:"validityDate",customRender:function(e){return Object(L["b"])(e.text)}},{title:"折扣",dataIndex:"discount"},{title:"商品库存",slots:{customRender:"stock"}},{title:"商品类型",slots:{customRender:"classify"}},{title:"商品销量",dataIndex:"saleNumber"},{title:"商品状态",dataIndex:"status",customRender:function(e){switch(e.text){case 1:return"正常";case 0:return"过期";default:return"状态未知"}}},{title:"操作",slots:{customRender:"actions"}}],a=Object(n["I"])(!1),c=Object(n["I"])(!1),r=Object(n["I"])([]),o=Object(n["I"])(0),u=Object(n["I"])(1),l=Object(n["I"])(""),i=Object(n["I"])(!1),d=Object(n["I"])(!1),s=Object(n["I"])({}),b=Object(n["I"])(!1),f=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C["f"].list({page:u.value,keywords:l.value,size:20});case 2:t=e.sent,Object(L["c"])(t).success((function(e){var t=e.data,a=t.list,n=t.total;r.value=a,o.value=n}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(e){u.value=e,f()};Object(n["A"])(Object(v["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:f();case 1:case"end":return e.stop()}}),e)}))));var m=function(){f(),i.value=Boolean(l.value)},j=function(){l.value="",i.value=!1,f()},p=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C["f"].delOneGood(t);case 2:a=e.sent,Object(L["c"])(a).success((function(e){var t=e.msg;D["a"].success(t),f()}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(e){var t=e.record;d.value=!0,s.value=t},g=function(e){var t=e.record;p(t._id)},y=function(e){D["a"].error("删除取消")},w=function(e,t){var a="增加";"OUT_STOCK"===e&&(a="减少"),R["a"].confirm({title:"要".concat(a,"多少库存?"),okText:"确认",okType:"primary",cancelText:"取消",content:Object(n["m"])("div",null,[Object(n["m"])(T["a"],{class:"good_inputStock"},null)]),onOk:function(){var a=Object(v["a"])(regeneratorRuntime.mark((function a(){var n,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=document.querySelector(".good_inputStock"),a.next=3,C["f"].updateStock({id:t._id,num:n.value,type:e,goodId:t._id});case 3:c=a.sent,Object(L["c"])(c).success((function(e){D["a"].success(e.msg),f()}));case 5:case"end":return a.stop()}}),a)})));function n(){return a.apply(this,arguments)}return n}()})},k=function(){f()},_=function(t){var a=t.record;1===a.status?e.push("/goods/".concat(a._id)):D["a"].error("商品已过期")};return{columns:t,show:a,list:r,formatTimeStamp:L["b"],loading:c,total:o,curPage:u,setPage:O,keywords:l,onSearch:m,backAll:j,isSearch:i,remove:p,confirm:g,cancel:y,editStock:w,showUpdateModal:d,update:h,curEditGood:s,updatedGoods:k,toDetail:_,access:b,getList:f,getClassifyTitleById:M["a"]}}});a("faeb");G.render=p,G.__scopeId="data-v-1a261008";t["default"]=G},e0c4:function(e,t,a){"use strict";a("b0c0");var n=a("7a23"),c=Object(n["l"])("正常"),r=Object(n["l"])("过期");function o(e,t,a,o,u,l){var i=Object(n["L"])("a-input"),d=Object(n["L"])("a-form-item"),s=Object(n["L"])("a-select-option"),b=Object(n["L"])("a-select"),f=Object(n["L"])("a-input-number"),O=Object(n["L"])("a-date-picker"),m=Object(n["L"])("a-form"),j=Object(n["L"])("a-modal");return Object(n["D"])(),Object(n["j"])("div",null,[Object(n["m"])(j,{visible:e.show,title:"修改商品",onOk:e.submit,onCancel:e.close,"ok-text":"确认","cancel-text":"取消"},{default:Object(n["V"])((function(){return[Object(n["m"])(m,{"label-col":e.labelCol,"wrapper-col":e.wrapperCol},{default:Object(n["V"])((function(){return[Object(n["m"])(d,{label:"商品名"},{default:Object(n["V"])((function(){return[Object(n["m"])(i,{value:e.editForm.name,"onUpdate:value":t[1]||(t[1]=function(t){return e.editForm.name=t})},null,8,["value"])]})),_:1}),Object(n["m"])(d,{label:"商品分类"},{default:Object(n["V"])((function(){return[Object(n["m"])(b,{placeholder:"请选择商品分类",value:e.editForm.classify,"onUpdate:value":t[2]||(t[2]=function(t){return e.editForm.classify=t})},{default:Object(n["V"])((function(){return[(Object(n["D"])(!0),Object(n["j"])(n["b"],null,Object(n["J"])(e.store.goodClassify,(function(e){return Object(n["D"])(),Object(n["j"])(s,{key:e._id,value:e._id},{default:Object(n["V"])((function(){return[Object(n["l"])(Object(n["O"])(e.title),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["value"])]})),_:1}),Object(n["m"])(d,{label:"商品价格"},{default:Object(n["V"])((function(){return[Object(n["m"])(f,{min:0,max:99999,value:e.editForm.price,"onUpdate:value":t[3]||(t[3]=function(t){return e.editForm.price=t})},null,8,["value"])]})),_:1}),Object(n["m"])(d,{label:"商品过期时间"},{default:Object(n["V"])((function(){return[Object(n["m"])(O,{"show-time":"",value:e.editForm.validityDate,"onUpdate:value":t[4]||(t[4]=function(t){return e.editForm.validityDate=t}),type:"date",locale:e.locale_date,placeholder:"选择过期时间",style:{width:"100%"},"disabled-date":e.disabledDate},null,8,["value","locale","disabled-date"])]})),_:1}),Object(n["m"])(d,{label:"商品折扣"},{default:Object(n["V"])((function(){return[Object(n["m"])(f,{min:0,max:99999,value:e.editForm.discount,"onUpdate:value":t[5]||(t[5]=function(t){return e.editForm.discount=t})},null,8,["value"])]})),_:1}),Object(n["m"])(d,{label:"商品状态"},{default:Object(n["V"])((function(){return[Object(n["m"])(b,{placeholder:"请选择商品状态",value:e.editForm.status,"onUpdate:value":t[6]||(t[6]=function(t){return e.editForm.status=t})},{default:Object(n["V"])((function(){return[Object(n["m"])(s,{value:"1"},{default:Object(n["V"])((function(){return[c]})),_:1}),Object(n["m"])(s,{value:"0"},{default:Object(n["V"])((function(){return[r]})),_:1})]})),_:1},8,["value"])]})),_:1})]})),_:1},8,["label-col","wrapper-col"])]})),_:1},8,["visible","onOk","onCancel"])])}var u=a("1da1"),l=(a("96cf"),a("a9e3"),a("c1df")),i=a.n(l),d=a("40a7"),s=(a("5c3a"),a("8e44")),b=a("e428"),f=a("f64c"),O=a("4360");i.a.locale("zh-cn");var m=Object(n["n"])({props:{show:Boolean,good:Object},setup:function(e,t){var a=Object(n["H"])({name:"",price:0,classify:"",validityDate:0,discount:0,status:1}),c=function(e){return e&&e<i()().endOf("day")},r=function(){var n=Object(u["a"])(regeneratorRuntime.mark((function n(){var c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,s["f"].update({id:e.good._id,name:a.name,price:a.price,classify:a.classify,validityDate:a.validityDate.valueOf(),discount:a.discount,status:a.status});case 2:c=n.sent,Object(b["c"])(c).success((function(e){var a=e.data;t.emit("updatedGood",a),f["a"].success(c.data.msg),o()}));case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),o=function(){t.emit("update:show",!1)};return Object(n["T"])((function(){return e.good}),(function(e){Object.assign(a,e),a.validityDate=i()(Number(a.validityDate))})),{labelCol:{span:6},wrapperCol:{span:12},locale_date:d["a"],submit:r,props:e,close:o,disabledDate:c,editForm:a,store:O["a"].state}}});m.render=o;t["a"]=m},faeb:function(e,t,a){"use strict";a("135a")}}]);
//# sourceMappingURL=goods.ad2a2bc3.js.map