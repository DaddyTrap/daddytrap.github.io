---
layout: post
title: 配置Github Pages与本地jekyll环境
subtitle: 用Github Pages搭建博客吧！
author: DaddyTrap
date: 2017-10-01 11:03:25 +0800
categories: Tutorial
---

## 前言

### 不自己做个博客吗？

或许很多同学已经有开始写一些博客，可能使用的是CSDN或者作业部落这一类的网站。但是毕竟是别人家的网站，如果想要自定义一些东西的时候怕是不太方便了。

所以，不自己做个博客吗？

### Github Pages

[Github Pages](https://pages.github.com/) 是Github提供的，可以让用户在这上面serve **静态**网站 的服务。(学习过web的同学应该不难理解静态网站和动态网站的区别)

简略地说，使用方法就是创建一个仓库，命名为 `username.github.io` (对应自己的github用户名)，然后在仓库根目录下放一个 **index.html**，就可以通过 **https://username.github.io/** 来访问到自己的index.html了。

### jekyll

[jekyll](https://jekyllrb.com/) ([中文点这里](http://jekyllcn.com/)) 是一个将jekyll模板(支持Markdown, Liquid, HTML)转换为静态页面的工具。即使用jekyll就可以轻松地用Markdown来写博客了。

### Github Pages + Jekyll

由于Github Pages就是使用Jekyll构建的，因此我们可以轻松地结合Github Pages和Jekyll，用他们来搭建一个 **免费** 的博客网站。Live Demo就是我的这个[博客](https://daddytrap.github.io/)啦！

## 正文

>你可以轻松地在上面引用的Github Pages和Jekyll的网站中看到官方的配置方法，而我个人做的工作就是就个人的经验，结合可能遇到的情况，描述一个更加详细点的配置过程(也算是翻译了官网的教程)。

### Jekyll

#### Ruby

首先，Jekyll是用Ruby语言写的，所以我们需要 **Ruby** 环境，且版本需要是 **2.x**

##### Linux

我个人只是用过Ubuntu，因此对其他Linux发行版不太了解，因此使用其他Linux发行版的同学可以以此作参考，但不一定能照搬。

网上查找教程，会查到使用 `sudo apt-get install ruby-full` 来安装，而个人使用这个命令时，可能由于网络原因，遇到了错误。而我最终使用的是 [rbenv](https://github.com/rbenv/rbenv#basic-github-checkout) ，跟着 **Basic Github Checkout** 这一段就可以完成rbenv的安装。

之后使用 `rbenv install 2.4.2`(我正在使用的版本)，即可安装ruby。

##### Windows

Windows的操作比较直观，但是比较耗时……

首先下载 [**Ruby Installer**](https://rubyinstaller.org/downloads/)，如果你因为“网络原因”无法进入下载，可以试试这里 ([x64](/files/rubyinstaller-2.4.2-2-x64.exe) [x86](/files/rubyinstaller-2.4.2-2-x86.exe))

下载完成后打开installer

![ruby_installer_0](/assets/jekyll_setup/ruby_installer_0.png)

记住自己选择的安装路径(如果记不住建议按默认的C盘安装)，然后下一步

安装完成后，有一个询问是否自动安装MSYS环境的复选框，把它勾上再完成。

![ruby_installer_1](/assets/jekyll_setup/ruby_installer_1.png)

然后，就会进入安装MSYS环境的命令行 ([MSYS是啥？](http://www.mingw.org/wiki/MSYS) 简单来说就是在Windows下装了一个能运行Linux指令的命令行)

见到下面这个框，直接按ENTER (表示安装1,2,3)

![ruby_installer_2](/assets/jekyll_setup/ruby_installer_2.png)

安装中途会弹出MSYS2的安装向导，一直下一步就好。

![ruby_installer_3](/assets/jekyll_setup/ruby_installer_3.png)

![ruby_installer_4](/assets/jekyll_setup/ruby_installer_4.png)

在完成的一步，可以把 **立即运行 MSYS2 64bit。** 这一个复选框去掉勾，因为我们现在不急着打开MSYS。

![ruby_installer_5](/assets/jekyll_setup/ruby_installer_5.png)

之后是比较漫长的等待，你可以选择先做作业、玩一把游戏或者冲杯茶。而中途有可能会因为“网络原因”而导致某些部件安装不成功，一般程序会尝试重新下载，而在一些情况下可能会**失败跳出**，如果真的出现了这样的情况，不要紧张，重新打开cmd/powershell，然后输入 `ridk install`，ENTER后再直接ENTER一次即可重试(我在这个过程中重复这个步骤多次……可能因为wifi不稳定吧)

##### 测试安装

在命令行中运行指令 `ruby -v` ，能看到显示版本号并且版本是**2.x**就算安装成功了

![ruby_installer_6](/assets/jekyll_setup/ruby_installer_6.png)

#### Bundle & Jekyll

首先使用gem来安装bundler，在终端(/Git Bash)输入

```
gem install bundler
```

如果出现了网络问题，可以尝试 *更换gem的源* ，将其更改为淘宝的ruby镜像(如下图上面的两条指令)

![jekyll_setup_0](/assets/jekyll_setup/jekyll_setup_0.png)

---

> 注意：下面的是按个人经验所做的操作，可能并不是特别地优雅，还请了解

---

下面开始配置Jekyll环境。首先创建一个文件夹，命名最好跟仓库名相同，如 **daddytrap.github.io** ，在里面创建一个空的文件(txt)，编辑成下面的内容，并 **重命名** 为 **Gemfile**

```
source 'https://rubygems.org' # 如果想用淘宝的镜像，这里修改为 'https://gems.ruby-china.org/'
gem 'github-pages', group: :jekyll_plugins
```

(当然或许你可以用些命令来创建)
```
echo "source 'https://rubygems.org'" > Gemfile
echo "gem 'github-pages', group: :jekyll_plugins" >> Gemfile
```

Windows的步骤截图如下

![jekyll_setup_1](/assets/jekyll_setup/jekyll_setup_1.png)
![jekyll_setup_2](/assets/jekyll_setup/jekyll_setup_2.png)
![jekyll_setup_3](/assets/jekyll_setup/jekyll_setup_3.png)

> 有的同学的Windows可能设置了 “隐藏已知扩展名” ，导致重命名的时候实际上是重命名为了 `Gemfile.txt`，这一点请多多注意

然后使用cd命令进入目录，或者在**/username.github.io/ 目录**中"右键--Git Bash Here"打开终端，再执行命令

```
bundle install
```

![jekyll_setup_4](/assets/jekyll_setup/jekyll_setup_4.png)
![jekyll_setup_5](/assets/jekyll_setup/jekyll_setup_5.png)

安装完成后，就可以在这里执行 `jekyll` 的指令了

#### 初始化jekyll文件

在 **/username.github.io 目录** 中，执行命令 (注意命令最后还有个`'.'`啊！)

```
bundle exec jekyll _3.3.0_ new --force .
```

![jekyll_setup_6](/assets/jekyll_setup/jekyll_setup_6.png)

这条指令会生成jekyll需要的一些文件

由于会多一些新的东西需要安装，因此再次执行

```
bundle install
```

![jekyll_setup_7](/assets/jekyll_setup/jekyll_setup_7.png)

#### 测试安装

执行指令

```
bundle exec jekyll serve
```

![jekyll_setup_8](/assets/jekyll_setup/jekyll_setup_8.png)

打开浏览器，尝试访问 http://127.0.0.1:4000/，如果出现的页面是下面这种感觉，那么就算成功啦!

![jekyll_setup_9](/assets/jekyll_setup/jekyll_setup_9.png)

---

如果你想马上在本地试试写博客，可以跳转到[这里](#blog_tutorial)

---

### Github Pages

完成了Jekyll在本地的配置，那么就可以准备一下Github Pages了

#### 前置

首先，这里还是需要一个前置的配置，就是配置Git。这里推荐 [廖雪峰的Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000) ，其中包括git的各种操作。如果你打算先跟着本篇博客的步骤再学习Git，则可以先阅读 [**安装Git**](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137396287703354d8c6c01c904c7d9ff056ae23da865a000) 一节，然后再继续阅读本篇博客。

> 由于看到上面所说的Git博客中提供的国内Git Bash版本较低，所以此处可以提供 ([Git-2.14.1-64-bit](/files/Git-2.14.1-64-bit.exe) [Git-2.14.1-32-bit](/files/Git-2.14.1-32-bit.exe))

#### 创建Github仓库

我想Github的注册过程难不倒大家……此处略过。

登录自己的帐号后在主页找到 **New repository** 的按钮，就会跳转到创建仓库的页面。

![github_repo_0](/assets/jekyll_setup/github_repo_0.png)

如前言所说的，仓库名命名为 **username.github.io** ，比如我的username是 **daddytrap**，仓库名就是 **daddytrap.github.io** 。(我已经有这个仓库了，所以截图里报了错误～)

![github_repo_1](/assets/jekyll_setup/github_repo_1.png)

创建好之后，跳转到新创建的仓库页面

![github_repo_2](/assets/jekyll_setup/github_repo_2.png)

#### 把本地的博客推上Github Pages

在仓库页面中的 **Quick Setup** 附近找到仓库的url。如果你懂使用 **SSH** 需要做些什么工作，我更推荐使用 **SSH**；相对的，如果你暂时不太能理解，使用 **HTTPS** 在当前会少一些工作。选择好HTTPS/SSH后复制这串URL，然后在 **/username.github.io 目录** 中打开终端/Git Bash。

![github_repo_3](/assets/jekyll_setup/github_repo_3.png)

执行指令

```
git init # 初始化git仓库
git remote add origin https://github.com/DaddyTrap/demo.github.io.git # 这里的URL改成刚刚复制的结果
git add -A # 将所有文件加入暂存区 (Git指令教程参考廖雪峰的网站)
git commit -m "Initial commit" # commit
git push origin master # 将本地仓库的内容“推”到远程仓库
```

push的时候，如果使用HTTPS，则会提示输入账号密码，这里输入Github的账号密码即可

![github_repo_4](/assets/jekyll_setup/github_repo_4.png)

push之后，大概几秒钟到几分钟，就可以通过访问 http://username.github.io/ 来看到跟本地一样的博客了！

<div id="blog_tutorial"></div>

### Jekyll使用

可是，说了这么多还没有讲Jekyll应该怎么用呢！

那么首先看看Jekyll的目录结构，下面是我的Jekyll的结构，可能跟大家的有些许不同 (文件的内容可以参考[我的仓库](https://github.com/DaddyTrap/daddytrap.github.io))

```
.
├── _config.yml     # 一些配置，可以在模板中读到这些配置
├── Gemfile         # 表示要安装的东西，bundle install时根据该文件进行安装
├── Gemfile.lock
├── _includes       # 可include的模板目录
├── index.md        # 主页模板
├── _layouts        # 布局模板目录
├── LICENSE         # 就是LICENSE啦
├── _posts          # 文章/博客(post)目录
└── _site           # 自动生成的静态页面目录，不用push到github
```

所以，如果你想要写博客，那么就在 `_posts` 目录下，创建一个带时间、标题的文件，如 **2017-09-25-first-post.md**

然后里面需要一点基本信息

```
---
layout: post
title: First Post
date: 2017-09-25 18:28:04 +0800
categories: jekyll
---
```

layout表示这个页面使用的布局，默认的只有default和post，而这里更适合用post，因此就用post了(当你有自己写的布局时可以通过这个修改)

title一般就是指文章的标题，date是日期，categories表示分类(利用这个属性可以分类各种博客哦)

然后下面就可以写Markdown内容啦！示例如下

![github_repo_5](/assets/jekyll_setup/github_repo_5.png)

运行

```
bundle exec jekyll serve
```

就可以通过访问 http://127.0.0.1:4000/ 来预览自己的post了！

![github_repo_6](/assets/jekyll_setup/github_repo_6.png)
![github_repo_7](/assets/jekyll_setup/github_repo_7.png)

写完了，就可以来一波

```
git add -A
git commit -m "your comment"
git push origin master
```

然后过一段时间，就可以在 http://username.github.io/ 看到更新了

#### 在新环境写博客

既然用了Github，那当然是想在多个地方都可以编辑或者和其他人合作编辑啦，那要怎么做呢？

首先要保证新环境也有 **Git** 和 **Ruby**

首先使用

```
git clone https://github.com/DaddyTrap/demo.github.io.git
```

将仓库克隆下来，然后cd进入，安装jekyll

```
gem install bundler # 如果已安装可跳过
bundle install
```

就这样，就可以开始serve(`bundle exec jekyll serve`)了

#### 换主题？

我的博客跟默认的有挺大区别的，其实用的是[Cayman](https://pages-themes.github.io/cayman/)这个主题

实际上，要自己造主题也就是写些前端代码而已，而我拿来用的这个主题，我也做了一些微小的二次开发(比如post中有后退按钮)，但本篇博客也不能把所有这些东西讲的面面俱到，所以在此也不多赘述了

## 后记

最近听说了其他的博客工具，比如 [Hexo](https://hexo.io/zh-cn/index.html) 。所以着手写这篇博客的时候也考虑到了一个问题，写Jekyll真的有用吗？

后来想想，毕竟暂时来讲，Github Pages还是能直接支持Jekyll，所以问题也不大吧。

如果对本博客有任何想法、任何意见、任何问题，请随意联系我～(Email等手段)