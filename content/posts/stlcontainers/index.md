---
title: "Neater Views of C++ STL Containers"
date: 2023-01-13T10:00:00+00:00
draft: false
tags: ["programming"]
categories: ["programming"]
---

I’ve been using the Remote VSCode extension to work on WSL and other Linux machines, and I’ve needed debugger support on most days. gdb has often answered the call to action, albeit one of the limitations of gdb is that it can be difficult to understand the state of complex data structures, such as linked lists and trees, when they are printed to the screen in their raw format. This is especially evident in C++ STL containers.

```bash
(gdb) print my_vector
$1 = {<std::_Vector_base<int, std::allocator<int> >> = {
    _M_impl = {<std::allocator<int>> = {<__gnu_cxx::new_allocator<int>> = {<No data fields>}, <No data fields>}, _M_start = 0x7fffffffdda0,
      _M_finish = 0x7fffffffdda0, _M_end_of_storage = 0x7fffffffdda0}}, <No data fields>}
```

This output is difficult to read and understand, as it displays the internal structure of the vector, including the memory addresses of the start, finish, and end of storage pointers, but it does not show the actual elements of the vector.

What we want, is this:

```bash
(gdb) print my_vector
$1 = {size = 5, capacity = 8,
  data = {0, 1, 2, 3, 4}}
```

In this article, we will show you how to set up a pretty printer in gdb, and how to use it to make debugging your code more effective.

## Install the pretty-printer

The first step in setting up a pretty printer in gdb is to install the pretty-printer itself. There are several pretty-printers available for gdb, such as the Python Pretty Printer (py-pretty) and the libstdc++ pretty-printer. For this article, we will use the libstdc++ pretty-printer, which is included with gdb.

> Note: the version of gdb you install has to have Python scripting enabled. To do this, and be sure of it, clone gdb and compile it from source like this
```bash
./configure --prefix=<where to install> --with-python=/usr/bin/python3 
make && make install  
```

To install the libstdc++ pretty-printer, you need to load the appropriate file in gdb. The file is typically located in the gdb folder, and its name is libstdc++.py or libstdc++.py.gz, depending on the version of gdb you are using.

## Load the printer in gdb

The best way is to add it to a .gdbinit file.
```bash
touch ~/.gdbinit
 
//In the file:
python 

import sys 

sys.path.insert(<path>) //Replace this with a path to the python folder in your gcc installation

from libstdcxx.v6.printers import register_libstdcxx_printers 
register_libstdcxx_printers (None) 

end
```

Launch gdb and type in:
```bash
info pretty-printers
```

This will show you the printers gdb managed to load on startup. All you need to do is print as you normally would.To see this reflect in your VSCode instance, ensure that pretty printers are enabled in your `launch.json` file.