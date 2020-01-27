<template>
  <div class="navbar">
    <el-row type="flex" class="row-bg" justify="space-between" align="center">
      <el-col :span="12" :xs="12" :sm="8" :md="12">
        <nuxt-link to="/" class="site-title">Torrents</nuxt-link>
      </el-col>
      <el-col :span="6" :xs="12" :sm="16" :md="6">
        <div class="grid-content bg-purple-light">
          <form @submit.prevent="searchTorrent">
            <el-input
              size="medium"
              placeholder="Search movies, animes, games etc"
              v-model="searchTerm"
              clearable
            ></el-input>
          </form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    searchTorrent() {
      if (this.searchTerm !== '') {
        this.$router.push(`/search?q=${this.searchTerm}`)
      }
    }
  }
}
</script>

<style>
.row-bg {
  align-items: center;
}
.site-title {
  font-size: 24px;
  color: white;
  text-decoration: none;
}
</style>
