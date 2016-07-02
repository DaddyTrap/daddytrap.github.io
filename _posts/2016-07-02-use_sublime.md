---
layout: post
title:  "配置Sublime Text 3的姿势"
date:   2016-07-02 23:07:55 +0800
categories: tutorial
---


本教程适用于新手，若有错误，烦请大神指正

>教程仍在施工阶段，若有想要鄙人说说的不妨[邮件](mailto:daddytrapc@gmail.com) (daddytrapc@gmail.com)


# 为什么用Sublime Text?

>如果你已经很明确你要学习sublime,那么这段就可以[跳过](#jumptostart)了

---

## *1.编辑器方面*
作为Notepad++的替代品。

在刚上大学的时候，鄙人用的是Notepad++来编写代码

其实确实是一个很好用的文本编辑器，然而不尽人意的地方就在于——它的主题配色

![notepad++_origin](/assets/use_sublime_pics/notepad++_origin.png)

其实作为一个可以个性化的文本编辑器(总之不要用Windows的Notepad就好了……)……它确实是可以调主题的

即便如此，效果还是不佳

![notepad++_mine](/assets/use_sublime_pics/notepad++_mine.png)

可以看出，主题配色变了，然而窗口的边框还是生硬的白色……

或许是鄙人寡闻，不知道有改边框的方法，但是第一次见到sublime就被酷炫的主题色吸引到了(虽说也有人吐槽sublime的原配色难看……)

下面放一下我的sublime大家感受一下吧

![sublime](/assets/use_sublime_pics/sublime.png)

---

## *2.编译器方面*

作为Dev-cpp的替代品。

（当然，应该说Dev-cpp是IDE(笑)，sublime是编辑器，不应该说用sublime“替代”Dev-cpp。）

以前是用Notepad++和Dev-cpp的组合来编写、编译代码的，然而我的Dev-cpp有很多让我蛋疼的地方……



例如……

* 有时能用有时抽风的Debugger

* 让人捉摸不透的自动缩进

* 不是特别好看的高亮

噢……我想Dev-cpp就不需要截图了……(我已经不太想打开它了……)

舍弃Notepad++的重要原因其实就在于，sublime可以在编辑器里面快捷键编译，这就是“替代”Dev-cpp的一个原因(不过这个功能，由于之后面对了很多 多文件同时编译的问题，逐渐被我抛弃……)

![sublime](/assets/use_sublime_pics/sublime_build.png)

Ctrl+Shift+B即可编译运行，这可是很方便哦

>对了上面的sort代码是错的

扯这么多纯属安利，下面进入正题。

---


<anchor id='jumptostart'/>
# 这里开始吧

## 1.下载

[点这里](http://www.sublimetext.com/3)

找到符合自己的系统下载就好了

## 2.配置编译环境
原本，sublime的编译(build)要改文件/替换文件等等，但是有一哥们觉得这样其实挺麻烦的，而且直接改默认的设置文件并不合适，于是他给sublime做了一个用来编译的插件。

不考虑我和那哥们的交情，我觉得插件想法不错，但是还是有缺陷，不过这个对初学者是已经足够的。

所以本文也就采用他的[插件](https://github.com/DaddyTrap/EasyBuildCpp)吧？

## 3.sublime的魅力所在——插件(plugin/package)

### 1.第一步：安装Package Control

Package Control是一个插件管理工具，使用它，可以很方便地对插件进行安装、卸载、禁用等，因此一般使用sublime都会安装它。

参考：[Package Control](https://packagecontrol.io/installation)

Ctrl+\`呼出控制台窗口，将

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

复制到其中，enter运行，稍等片刻Package Control就安装好了。以防万一，还是重启一下sublime。

>有时候会遇到错误，不要紧张，重启sublime再试一次(hhhhhh)

测试是否安装成功：Shift+Ctrl+P呼出命令面板(command_palette)

输入"package control"或者简单地输入"pc"，如果下面的模糊搜索出现了"Package Control: ..."的结果，就证明安装成功了。

![package control](/assets/use_sublime_pics/sublime_package_control.png)

### 2.第二步：下载插件

接下来，是时候展示真正的Package Control了

Ctrl+Shift+P呼出命令面板，输入"pci"(Package Control: Install Package)，Enter

![sublime_pci](/assets/use_sublime_pics/sublime_pci.png)

然后就会出现各种插件了

![sublime_pci_exec](/assets/use_sublime_pics/sublime_pci_exec.png)

跟命令面板相似，可以“模糊搜索”

搜索到插件后，确认选中了该插件后，Enter即可，进度条在左下角

一会儿，插件就会安装完成。一些插件安装完后会有文档弹出，建议仔细阅读，以便于更好地理解如何使用

个人推荐的插件：

* ClangFormat 可以使代码“格式化”，就是自动调整缩进等等，支持谷歌风格(需要clang-format支持)

* Emmet 写前端代码的神器，网上教程较多，此处不赘述

* Monokai Extended 更好的代码高亮

关于自动补全的插件，我不太好推荐，因为我对自己现在使用的补全(ClangAutoComplete)不算特别满意

据说sublime的YouCompleteMe也是很好的，但是我还不会安装

### 3.快捷键使用

我自己常用的快捷键：

* Ctrl+Enter 不管光标在该行的何处，在此行下插入一个新行并将光标移下

* Ctrl+Shift+Enter 不管光标在该行的何处，在此行上插入一个新行并将光标移上

* Ctrl+L 选中该行

* Ctrl+K, Ctrl+K 从光标处开始删除该行

* Ctrl+D 搜索下一个与选中字符串相同的字符串并选中

* Ctrl+G 呼出面板，输入数字跳转到所输入的行数

* Ctrl+Shift+Up/Down(方向键) 将该行向上/下移动一行

* Ctrl+/ 注释光标所在行

* Ctrl+Shift+/ 注释所选区块(区块注释)