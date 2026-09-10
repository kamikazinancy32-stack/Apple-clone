# Read the file
$content = Get-Content 'index.html' -Raw

# Split into lines
$lines = $content -split "`r`n"
$cleaned = @()

foreach ($line in $lines) {
    # Remove trailing spaces
    $line = $line -replace '\s+$', ''
    
    # Count leading spaces and normalize to 2-space indents
    if ($line -match '^(\s+)') {
        $leadingSpaces = $matches[1].Length
        # Round to nearest 2-space indent
        $indentLevel = [math]::Round($leadingSpaces / 2)
        $newIndent = ' ' * ($indentLevel * 2)
        $line = $newIndent + $line.TrimStart()
    }
    
    $cleaned += $line
}

# Remove multiple consecutive blank lines
$result = @()
$lastWasBlank = $false
foreach ($line in $cleaned) {
    if ([string]::IsNullOrWhiteSpace($line)) {
        if (-not $lastWasBlank) {
            $result += ''
            $lastWasBlank = $true
        }
    }
    else {
        $result += $line
        $lastWasBlank = $false
    }
}

# Write back
$result -join "`r`n" | Set-Content 'index.html' -Encoding UTF8
Write-Host "Done - HTML file reformatted"
