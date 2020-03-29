<template>

       <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  @click="showPhoto=true" center >
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name"  />
      <van-cell is-link title="性别" @click="showGender=true" :value="user.gender===0 ?'男':'女'"/>
      <van-cell is-link title="生日" @click="showDate" :value="user.birthday" />
    </van-cell-group>

    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%" :close-on-click-overlay="false">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
       <van-cell is-link title="本地相册选择图片"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>

     <!-- 昵称弹层 -->
    <van-popup v-model="showName" style="width:80%" :close-on-click-overlay="false">
       <!-- 编辑用户昵称  双向绑定用户的昵称-->
       <van-field :error-message="nameMsg" v-model="user.name" type='textarea'  rows="4"></van-field>
       <!-- 用来效验关闭弹层 -->
       <van-button block type="info" size='normal' @click="btnName" >确定</van-button>
    </van-popup>

    <!-- 性别弹层 =>van-action-sheet -->
    <van-action-sheet  @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>

    <!-- 生日弹层 -->
    <van-popup v-model="showBirthDay" position="bottom" :close-on-click-overlay="false">
      <!-- 选择出生日期  出生日期应该小于现在时间-->
      <!-- type表示 当前的日期类型 年月日 -->
      <van-datetime-picker
           v-model="currentDate"
           type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmDate"
          @cancel="showBirthDay=false"
         />
    </van-popup>
  </div>

</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      showPhoto: false, // 显示头像弹层:
      showName: false, // 显示昵称弹层
      showGender: false, // 显示性别弹层
      showBirthDay: false, // 控制生日弹层

      actions: [{ name: '男' }, { name: '女' }], // 性别数据
      minDate: new Date(1900, 1, 1), // 最小时间
      maxDate: new Date(), // 生日最大时间 永远是小于等于当前时间的
      currentDate: new Date(), // 当前时间

      nameMsg: '', // 输入错误信息提示

      user: {
        // 放置个人资料信息
        name: '', // 用户昵称
        gender: 1, // 性别默认值
        birthday: '', // 生日默认值
        photo: '' // 用户头像
      }
    }
  },
  methods: {
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '用户昵称的长度应该是1-7的长度要求'
        return
      }
      this.nameMsg = '' // 直接将错误信息清空
      this.showName = false
    },
    selectItem (item, index) {
      this.user.gender = index// 性别选择 index 0 男  1 女
      this.showGender = false
    },
    showDate () {
      this.showBirthDay = true
      // 将当前的生日 设置到 选择日期的当前时间  将生日字符串 转化成Date对象 绑定到 日期组件上
      this.currentDate = new Date(this.user.birthday)
    },
    confirmDate () {
      //  当前选择的生日 其实就是 currenDate
      this.user.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.showBirthDay = false
    }
  }
}
</script>

<style>

</style>
