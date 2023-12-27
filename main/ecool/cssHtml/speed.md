## 盒子模型
内容 + 内边距 + 边框 + 外边距

- 标准盒子模型：margin + border + padding + width，即width = content
- IE盒子模型：margin + width（border + padding + content） ，即 width = border + padding + content

通过`box-sizing: content-box|border-box|inherit`修改
content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
inherit 指定 box-sizing 属性的值，应该从父元素继承

## 设备像素（）、css像素（px）、设备独立像素（）、dpr（设备像素/设备独立像素）、ppi（每英寸所包含的像素点数目）
https://fe.ecool.fun/topic-answer/9d9b80c8-3768-4bf3-96a6-b6c6bf7cb8c3?orderBy=updateTime&order=asc&tagId=0
设备像素：物理像素，能控制显示的最小物理单位
设备独立像素：一个设备独立像素里可能包含1个或者多个物理像素点，包含的越多则屏幕看起来越清晰


## css动画
- transition 渐变动画
property:填写需要变化的css属性
duration：完成过渡需要的时间单位
timing-function:完成效果的速度曲线
delay：动画效果的延迟触发事件
不是所欧属性都可以过渡：如display none 到display block

- transform 转变动画
translate 位移
scale 缩放
rotate 旋转
skew 倾斜
不支持inline元素，使用前把它变成block

- animation 自定义动画
@keyframes rotate{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
animation: rotate 2s;

属性	含义
transition（过度）	用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同
transform（变形）	用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表”
translate（移动）	只是transform的一个属性值，即移动
animation（动画）	用于设置动画属性，他是一个简写的属性，包含6个属性
