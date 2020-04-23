<template>
    <div>
        <Navbar/>
        <loading :active.sync="isLoading"></loading>
        <Alert></Alert> 
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>

import Navbar from './Navbar'
import Alert from '@/components/Alert'
import Footer from './Footer'




export default {
    components:{ 
        Navbar,
        Alert,
        Footer,
    },

}
</script>