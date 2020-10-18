# update-gsi-style
スタイルのExpression修正

[地理院地図Vector](https://maps.gsi.go.jp/vector/)のスタイルは、Mapox Styleの新旧の方式のExpressionが混在しているので、とりあえずfilterだけ、新方式のExpressionに修正するプログラム。
とりあえず、表示はできることを確認。

もとになるスタイル(style.json)は、国土地理院で提供している[このレポジトリ](https://github.com/gsi-cyberjapan/gsimaps-vector-style-spec-converter)等から取得してください。
