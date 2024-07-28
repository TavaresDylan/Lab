<script setup lang='ts'>
import { ref } from 'vue';

const drawer = ref<boolean>(true);

</script>

<template>
    <v-navigation-drawer v-model="drawer" app clipped fixed dark width="300">
        <v-list>
            <v-list-item v-for="item in items" :key="item.title" link @click="navigate(item.route)">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
