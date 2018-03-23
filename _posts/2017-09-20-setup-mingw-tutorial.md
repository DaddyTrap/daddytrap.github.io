---
layout: post
title: Windows配置MinGW
subtitle: 用命令行编译撞壁吧！
author: DaddyTrap
date: 2017-09-20 20:56:52 +0800
categories: Tutorial
---

---

> Edit (2018.3.23): 现在的我觉得，或许 [TDM-GCC](http://tdm-gcc.tdragon.net/download) 是一个更好的选择

---

## 前言

前几天周一赶着去上10点的课的路上，大概是在中环红绿灯那里听到两位仁兄在聊 *Dev-cpp* 和 *Visual Studio* 。其中聊VS的仁兄表示没有听说过Dev-cpp，而说Dev-cpp的仁兄则是说听师兄说初学用Dev-cpp比较好。如此听来，应该是17级的新生吧？正好心血来潮想给 *新同学* 一些人生经验，正好一不小心听到这个话题，不如就试着写个关于 **编译器** 的博客吧。(所以说老同学可能就早就懂这些东西啦……)

### VS? Dev? 或是 ...?

严谨一点说，VS和Dev应该称为 `IDE(Integrated Development Environment, 集成开发环境)` 比较合适，因为它们包含了 *编辑器、编译器、调试器* 三件套，而且提供了一些 “项目配置” 的选项。

这里再补充一下上面所说的三件套的概念
+ 编辑器，文本编辑器，用来打代码的地方，如notepad++，一般只需要提供编辑文本的功能即可，如记事本也能作为编辑器
+ 编译器，将代码文件转变为可执行文件的程序，对于C语言和C++，一般使用 `gcc` 或者 `clang` 等等，如果使用过linux编程的话应该会对 `gcc` 有印象
+ 调试器，调试可执行程序的工具，使用断点、单步执行等操作使开发者能跟踪程序执行找到出错的地方，以便修改代码

关于VS还是Dev的这个问题，我也觉得不能马上说哪个好哪个不好，所以就分享一些个人的见解吧

+ Visual Studio
  + VS是微软的一个大型IDE，有着非常强大的功能，特别是编写与微软产品有关的软件时必不可少，如UWP等
  + 然而，也因为VS几乎面面俱到，也就显得有点臃肿，占用空间大概10G以上、打开时候较慢
+ Dev-cpp
  + Dev-cpp相对来说，就十分地轻量，为什么总会把这个推荐给初学者，大概就是因为轻量和操作简单吧
  + 而缺点是，个人觉得它的自动缩进比较迷，另外有时也会出现一些奇怪的bug

下面就吹一吹今天的主角 `MinGW (Minimal GNU for Windows)` 了

`MinGW` 使得在Windows下也可以使用一些linux上的东西，比如 `gcc` 。安装了 `MinGW` 之后就可以像在linux上的时候一样，在 `cmd` 或者 `powershell` 上用 `gcc main.c` 这样的命令来编译代码了

![compile](/assets/setup-mingw-tutorial/extra_1.png)

## 正题

### 下载

方便起见，这里直接使用了 `MinGW Installer`

下载地址是： [https://sourceforge.net/projects/mingw/files/latest/download?source=files](https://sourceforge.net/projects/mingw/files/latest/download?source=files)

下载完成，直接打开开始安装

### 安装

![install_0](/assets/setup-mingw-tutorial/install_0.png)

这里可以直接点 **Install** ，然后下一个对话框可以选择安装的目录(要记得自己选的目录)，等待下载、安装……

![install_1](/assets/setup-mingw-tutorial/install_1.png)

这里就直接点 **Continue** ，但这还没完，这才只安装了一个管理器。

打开管理器后，在 **Basic Setup** 中找到 **mingw32-gcc-g++** 右键选择 **Mark for Installation**

![install_2](/assets/setup-mingw-tutorial/install_2.png)

选中后，点击左上角的 **Installation -- Apply Changes**

![install_3](/assets/setup-mingw-tutorial/install_3.png)

弹出窗口，直接 **Apply**

![install_4](/assets/setup-mingw-tutorial/install_4.png)

然后又是比较漫长的等待下载、安装过程，最后到下面这里，就可以点击 **Close** 了

![install_5](/assets/setup-mingw-tutorial/install_5.png)

最后进入自己选择的安装目录，确认一下东西是不是都在了

![install_6](/assets/setup-mingw-tutorial/install_6.png)
![install_7](/assets/setup-mingw-tutorial/install_7.png)

如果没有问题，那么就可以进入下一阶段了

### 配置环境变量

虽然是安装好了，但是并不能就这样轻易地在 `cmd` 打开。对环境变量有一定了解的同学应该知道，有一个叫做 `Path` 的环境变量非常关键，在命令行中输入命令基本上就是在 `Path` 所指定的路径中找跟命令相同名字的程序 —— 也就是说，我们要让 `Path` 中含有 `gcc` 编译器的路径，才能直接在cmd中输入gcc来编译代码。做法如下

对 `这台电脑` / `我的电脑` / `此电脑` 右键 -- 属性

![env_0](/assets/setup-mingw-tutorial/env_0.png)

然后根据下图的灵魂涂鸦进行操作

![env_1](/assets/setup-mingw-tutorial/env_1.png)

上面的操作所做的是新建一个叫做 `BuildTools` 的环境变量，用于记录 `MinGW` 的根目录，因此变量值应该根据自己所选择的安装目录来修改。

然后再编辑 `Path` 变量，根据下图的灵魂涂鸦进行操作

![env_2](/assets/setup-mingw-tutorial/env_2.png)

> 上面说到我们要改的应该只是 `Path` 这个环境变量，那么为什么还要写一个 `BuildTools` 呢？如果你了解C语言中 `const` 变量、`#define` 宏定义的一些应用，或许自然就能理解了。

> 以我的设置为例，如果不用新建 `BuildTools` 变量，那么在 `Path` 中应该要写 `xxx;C:\MinGW\bin` ，那么假设我将MinGW移动到了另一个位置，那么我就要直接改动 `Path` 变量。这似乎没有什么问题，但如果我在 `Path` 中原本是这样 (`xxx;C:\MinGW\bin;C:\MinGW\bin2;C:\MinGW\bin3`) 呢？

> 如果使用 `%BuildTools%` ，在MinGW移动后，只需要改动 `BuildTools` 这一个变量，就可以使 `Path` 变量也随之改变 —— 这便是多一个变量的好处之一

到这里配置已经完成了，下面就测试一下配置是否成功啦

按下 Win+R (Win指Windows徽标键) 呼出“运行”，在其中输入 `cmd` 或者 `powershell` 呼出命令行，在其中输入 `gcc --version` 并按下回车键，如果没有什么报错就是已经配置好了

![env_3](/assets/setup-mingw-tutorial/env_3.png)

那么不妨试着写个Hello World，编译运行一波

![env_4](/assets/setup-mingw-tutorial/env_4.png)

## Extra

说是extra，其实只是不知道应该插在正文的哪里而已……

有时候代码的目录很深，一层一层cd非常痛苦，所以可以直接在资源管理器中打开到有代码文件的文件夹，在没有选中任何文件时，**按住shift在空白处右键**，便能找到 **在此处打开命令窗口**。打开之后就直接到了这一目录了，也就省去了cd的麻烦。

![extra_0](/assets/setup-mingw-tutorial/extra_0.png)
![extra_1](/assets/setup-mingw-tutorial/extra_1.png)

## 后记

实际上，有心的同学可能会发现Dev-cpp的文件夹中，就有一个叫mingw的文件夹 —— 没有错，实际上Dev-cpp就只是mingw的一层壳，我们可以通过Dev-cpp来使用编译器gcc，但我们也可以不通过它而直接使用gcc，这就是这一个简单Tutorial中所讲述的内容。

希望你能在这学会 **在命令行中编译代码并运行** ，享受撞壁的快感～

而如果是大佬们觉得鄙人有哪里写的不好，还请不吝赐教了……