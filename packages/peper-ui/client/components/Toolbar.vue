<template>
<div class="peper-toolbar" :class="fixToolbar">
    <slot name="top-content"></slot>
    <div :class="backgroundClass"></div>
    <div class="contain">
        <slot name="left"></slot>
        <div class="title">
            {{ title }}
        </div>
        <div class="pull-right">
            <slot name="right"></slot>
        </div>
    </div>
    <slot name="bottom-content"></slot>
</div>
</template>

<script>
export default {
    props: {
        title : null,
        backgroundColor: {
            default: 'white',
        },
        textColor: {
            default: "theme-text-color",
        },
        fix: {
            type: Boolean,
            default: false,
        },
        fixScrollTop: {
            type: Boolean,
            default: true,
        },
        noDepthBefore: {
            type: String,
            default: undefined,
        },
        noBgBefore: {
            type: String,
            default: undefined,
        },
        noTitleBefore: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        backgroundClass() {
            return 'peper-background background background-' + this.backgroundColor;
        },
        fixToolbar() {
            if (this.fix) {
                return "fixed";
            }

            return "";
        }
    },
    mounted() {
        let self = this;
        self.$nextTick(function() {
            let $el = $(self.$el);
            var tempTextColor = self.textColor;
            $el.addClass('color-' + tempTextColor);

            self.$watch("textColor", function() {
                $el.removeClass('color-' + tempTextColor);
                tempTextColor = self.textColor;
                $el.addClass('color-' + tempTextColor);
            })

            let elementToTrackShadow = null;
            let elementToTrackShadowFromTop = null;
            if (self.noDepthBefore) {
                $el.css("box-shadow", "none");
                elementToTrackShadow = $(self.noDepthBefore);
                let shadowResizeWindows = function() {
                    elementToTrackShadowFromTop = elementToTrackShadow.position().top +
                                                  elementToTrackShadow.outerHeight() -
                                                  $el.outerHeight();
                }
                shadowResizeWindows();

                $(window).on("resize", function() {
                    shadowResizeWindows();
                })

                elementToTrackShadow.resize(function() {
                    shadowResizeWindows();
                });

                //to be review because using setTimeout as temporary fix
                self.$router.afterEach((to, from) => {
                    window.setTimeout(function(){
                        elementToTrackShadow = $(self.noDepthBefore);
                        shadowResizeWindows();
                    }, 500);
                })
            }

            let elementToTrackBg = null;
            let elementToTrackBgFromTop = null;
            if (self.noBgBefore) {
                $el.children(".peper-background").css("opacity", 0);
                // $el.children(".peper-background").css("background", "transparent !important");
                elementToTrackBg = $(self.noBgBefore);
                let bgResizeWindows = function() {
                    elementToTrackBgFromTop = elementToTrackBg.position().top +
                                              elementToTrackBg.outerHeight() -
                                              $el.outerHeight();
                }
                bgResizeWindows();

                $(window).on("resize", function() {
                    bgResizeWindows();
                })

                //to be review because using setTimeout as temporary fix
                self.$router.afterEach((to, from) => {
                    window.setTimeout(function(){
                        elementToTrackBg = $(self.noBgBefore);
                        bgResizeWindows();
                    }, 500);
                })
            }

            let elementToTrackTitle = null;
            let elementToTrackTitleFromTop = null;
            if (self.noTitleBefore) {
                $el.find(".title").css("opacity", 0);
                elementToTrackTitle = $(self.noTitleBefore);
                let titleResizeWindows = function() {
                    elementToTrackTitleFromTop = elementToTrackTitle.position().top +
                                              elementToTrackTitle.outerHeight() -
                                              $el.outerHeight();
                }
                titleResizeWindows();

                $(window).on("resize", function() {
                    titleResizeWindows();
                })

                self.$router.afterEach((to, from) => {
                    window.setTimeout(function(){
                        elementToTrackTitle = $(self.noTitleBefore);
                        titleResizeWindows();
                    }, 500);
                })
            }

            $el.parents(".optiscroll").on('scroll', function (ev) {
                if (elementToTrackShadow !== null) {
                    if (ev.originalEvent.detail.scrollTop >= elementToTrackShadowFromTop ) {
                        $el.css("box-shadow", "")
                    } else {
                        $el.css("box-shadow", "none");
                    }
                }

                if (elementToTrackBg !== null) {
                    if (ev.originalEvent.detail.scrollTop >= elementToTrackBgFromTop ) {
                        $el.children(".peper-background").css("opacity", 1);
                    } else {
                        $el.children(".peper-background").css("opacity", 0);
                        // elementToTrackBg.css("opacity", ev.originalEvent.detail.scrollTop / elementToTrackBgFromTop);
                    }
                }

                if (elementToTrackTitle !== null) {
                    if (ev.originalEvent.detail.scrollTop >= elementToTrackTitleFromTop ) {
                        $el.find(".title").css("opacity", 1);
                    } else {
                        $el.find(".title").css("opacity", 0);
                    }
                }
            });
        })

        // Meteor.startup(() => {
        //     if (self.particles) {
        //         particlesJS.load('peper-toolbar', '/packages/skynightz93_peper-ui/particles.json', function() {
        //             console.log('callback - particles-js config loaded');
        //         });
        //     }
        // });
    },
}
</script>
