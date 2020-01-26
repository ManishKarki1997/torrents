<template>
  <div class="home-main">
    <transition-group name="fade" tag="ul" class="list-group">
    <!-- <li v-for="(item, i) in items" class="list-group-item" v-bind:key="i">{{ item }}</li> -->
      <el-row class="row-bg" type="flexbox" key="001">
        <el-col :span="10" :xs="24" :md="11">
          <el-card class="torrent" shadow="hover">
            <div>
              <h4 class="torrent-title">Interstellar (2015)</h4>
              <div class="torrent-meta">
                <el-tag size="mini" effect="light">1298</el-tag>
                <el-tag size="mini" effect="light" type="danger">1298</el-tag>
              </div>
            </div>
            <div class="torrent-download-options">
              <MagnetIcon />
              <DownloadIcon />
            </div>
          </el-card>
        </el-col>
        <el-col :span="10" :xs="24" :md="11" :offset="2" key="002">
          <el-card class="torrent" shadow="hover">
            <div>
              <h4 class="torrent-title">Interstellar (2015)</h4>
              <div class="torrent-meta">
                <el-tag size="mini" effect="light">1298</el-tag>
                <el-tag size="mini" effect="light" type="danger">1298</el-tag>
              </div>
            </div>
            <div class="torrent-download-options">
              <MagnetIcon />
              <DownloadIcon />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </transition-group>
  </div>
</template>

<script>
import MagnetIcon from '~/assets/Icons/magnet.svg?inline'
import DownloadIcon from '~/assets/Icons/download.svg?inline'

export default {
  components: {
    MagnetIcon,
    DownloadIcon
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>
