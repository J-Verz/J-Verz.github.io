require "bundler/setup"
require "pdf-reader"
require "json"
require "date"
require "open-uri"

URL = "https://www.oev-info.ch/sites/default/files/grafapla/2020/G00d.pdf"

uri = URI.parse URL 
reader = PDF::Reader.new(uri.open)

PAGES_OF_INTEREST = 7..9 # Page 1 is indexed with 0...

vp_mapping = Hash.new { |hash, key| hash[key] = [] }
reader.pages.slice(PAGES_OF_INTEREST).each do |page|
  page.text.split("\n").each do |row|
    if row.match? /^.*\d{3}$/
      key, value = row.split(/\s+/).slice(-2..-1)
      vp_mapping[key] << value
    end
  end
end

output_path = File.join(__dir__, "../../assets/vp-map.js")
File.open(output_path, "w") do |file|
  file.write <<~JS
    export default  #{vp_mapping.to_json}
  JS
end
