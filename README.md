# update-gsi-style-expressions
スタイルのExpressions修正

[地理院地図Vector](https://maps.gsi.go.jp/vector/)のスタイルは、Mapox Styleの新旧の方式のExpressionsが混在しているので、とりあえずfilterだけ、新方式のExpressionsに修正するプログラム。
とりあえず、表示はできることを確認。

もとになるスタイル(style.json)は、国土地理院で提供している[このレポジトリ](https://github.com/gsi-cyberjapan/gsimaps-vector-style-spec-converter)等から取得してください。
