def lengthOfLongestSubstring(s):
        """
        :type s: str
        :rtype: int
        """
        m = {}
        start = 0
        max = 0
        for index, v in enumerate(s):
            mv = m.get(v)
            if str(mv) and m.get(v) >= start:
                print('---', m.get(v))
                start = m.get(v) + 1
            print("be-", index, v, start, max)
            if max < index - start + 1:
                max = index - start + 1
            
            m[v] = index
            print("af-", index, v, start, max, m)

        print(m)

        return max

value = lengthOfLongestSubstring("abcabcbb")
print("value===>", value)