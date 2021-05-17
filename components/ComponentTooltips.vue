<template>
    <div>
        <el-popover
        placement="bottom"
        width="200"
        trigger="click">
            <span @click.stop slot="reference">
                <i class="el-icon-more"></i>
            </span>
            <div class="content">
                <slot></slot>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
span
    display: flex !important
    width: 50px !important
    height: 40px !important
    justify-content: center
    align-items: center
</style>