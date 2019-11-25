sqlcmd -S . -U sa -P Sa123456! -Q "alter login [sa] with password=N'sa123456', CHECK_POLICY=OFF"
