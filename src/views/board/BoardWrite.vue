<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <input type="text" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
      <input type="text" v-model="author" class="w3-input w3-border" placeholder="작성자를 입력해주세요."
             v-if="idx === undefined">
    </div>
    <div class="board-contents">
      <textarea id="" cols="30" rows="10" v-model="contents" class="w3-input w3-border" style="resize: none;">
      </textarea>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestBody: {},
      idx: this.$route.query.idx,

      title: '',
      author: '',
      contents: '',
      createdAt: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.idx !== undefined) {
        this.$axios.get(`${this.$serverUrl}/boards/${this.idx}`, {
          params: this.requestBody
        }).then((res) => {
          this.title = res.data.title
          this.author = res.data.author
          this.contents = res.data.contents
          this.createdAt = res.data.createdAt
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    fnList() {
      delete this.$route.query.idx
      this.$router.push({
        path: '/board/list',
        query: this.requestBody
      })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = `${this.$serverUrl}/boards`
      this.form = {
        'idx': this.idx,
        'title': this.title,
        'author': this.author,
        'contents': this.contents
      }

      if (this.idx === undefined) {
        // INSERT
        this.$axios.post(apiUrl, this.form)
            .then((res) => {
              alert('게시물이 등록되었습니다.')
              this.fnView(res.data.idx)
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('서버와 연결이 되어 있지 않습니다.')
          }
        })
      } else {
        // UPDATE
        this.$axios.patch(apiUrl, this.form)
            .then((res) => {
              alert('게시물이 수정되었습니다.')
              this.fnView(res.data.idx)
            }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('서버와 연결이 되어 있지 않습니다.')
          }
        })
      }
    }
  }
}
</script>
