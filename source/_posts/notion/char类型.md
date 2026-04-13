---
title: char类型
date: 2021-07-19 15:34
description: char是什么类型
tags:
  - c
categories:
  - [c]
notion_id: 7a85369f-8cf2-455f-828c-3196750c24a4
---

**char**为字符型(整数类型),每一个宽度为8即为(1字节),取值范围-127~127,只能容量一个字符

检测char类型的字节大小

```c
#include <stdio.h>
int main()
{
	printf("Storage size for int : %d n", sizeof(char));
	return 0;
}
```
